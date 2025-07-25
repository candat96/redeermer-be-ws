import { PaginatedResponse } from '@common/classes/response.dto';
import {
  FieldNameEnum,
  ProjectFieldReviewEnum,
} from '@common/constants/enum/project-field-review.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectFieldReviewEntity } from '@modules/database/entities/project-field-reviews.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import {
  FindAllProjectDto,
  FindAllProjectResponseDto,
} from '@modules/project/dto/find-all-project.dto';
import { FindOneProjectResponseDto } from '@modules/project/dto/find-one-project.dto';
import { UpdateProjectDto } from '@modules/project/dto/update-project.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ContactPersonEntity)
    private readonly contractRepository: Repository<ContactPersonEntity>,
    @InjectRepository(ProjectDocumentEntity)
    private readonly projectDocumentRepository: Repository<ProjectDocumentEntity>,
    @InjectRepository(ProjectTagEntity)
    private readonly projectTagRepository: Repository<ProjectTagEntity>,
    @InjectRepository(ProjectFieldReviewEntity)
    private readonly projectFileReviewRepository: Repository<ProjectFieldReviewEntity>,
  ) {}

  async createProject(dto: CreateProjectDto, userId: string): Promise<boolean> {
    await this.projectRepository.manager.transaction(
      async (manager: EntityManager) => {
        const project = manager.create(ProjectEntity, {
          name: dto.name,
          description: dto.description,
          developer: dto.developer,
          propertyType: dto.propertyType,
          projectVerifiedStatus: dto.projectVerifiedStatus,
          saleStatus: dto.saleStatus,
          projectScale: dto.projectScale,
          objective: dto.objective,
          advantages: dto.advantages,
          location: dto.location,
          latitude: dto.latitude,
          longitude: dto.longitude,
          area: dto.area,
          numberOfFloors: dto.numberOfFloors,
          currentStatus: dto.currentStatus,
          estimatedCompletionTime: dto.estimatedCompletionTime,
          legalStatus: dto.legalStatus,
          proposedValue: dto.proposedValue,
          appraisedValue: dto.appraisedValue,
          pricePerUnit: dto.pricePerUnit,
          totalUnits: dto.totalUnits,
          minUnits: dto.minUnits,
          maxUnits: dto.maxUnits,
          owner: manager.create(UserEntity, { id: userId }),
        });

        await manager.insert(ProjectEntity, project);

        const contacts = dto.contactPerson.map((c) =>
          manager.create(ContactPersonEntity, {
            fullName: c.fullName,
            phone: c.phone,
            email: c.email,
            position: c.position,
            project: manager.create(ProjectEntity, { id: project.id }),
          }),
        );

        await manager.insert(ContactPersonEntity, contacts);

        const document = dto.documents.map((d) =>
          manager.create(ProjectDocumentEntity, {
            fileName: d.fileName,
            files: d.files,
            type: d.type,
            note: d.note,
            status: d.status,
            project: manager.create(ProjectEntity, { id: project.id }),
          }),
        );

        await manager.insert(ProjectDocumentEntity, document);

        const tags =
          dto.tags?.map((t) =>
            manager.create(ProjectTagEntity, {
              ...t,
              project: manager.create(ProjectEntity, { id: project.id }),
            }),
          ) || [];

        await manager.insert(ProjectTagEntity, tags);

        const fieldNameArray = Object.values(FieldNameEnum);

        const fieldName = fieldNameArray.map((fa) =>
          manager.create(ProjectFieldReviewEntity, {
            fieldName: fa,
            status: ProjectFieldReviewEnum.PENDING,
            project: manager.create(ProjectEntity, { id: project.id }),
          }),
        );

        await manager.insert(ProjectFieldReviewEntity, fieldName);
      },
    );
    return true;
  }

  async updateProject(
    id: string,
    dto: UpdateProjectDto,
    userId: string,
  ): Promise<boolean> {
    const project = await this.projectRepository.findOne({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
      relations: ['contactPerson', 'document', 'tags'],
    });

    if (!project) {
      throw new NotFoundException(ErrorCode.PROJECT_NOT_FOUND);
    }

    await this.projectRepository.manager.transaction(async (manager) => {
      if (project.contactPerson?.length) {
        const updateContactPerson = dto.contactPerson.map((contact) =>
          this.projectDocumentRepository.create({ ...contact, project }),
        );

        await manager.save(ContactPersonEntity, updateContactPerson);
      }

      if (dto.documents?.length) {
        const updateDocs = dto.documents.map((document) =>
          this.projectDocumentRepository.create({ ...document, project }),
        );

        await manager.save(ProjectDocumentEntity, updateDocs);
      }

      if (dto.tags) {
        await manager.softDelete(ProjectTagEntity, { project: { id: project.id } });

        const newTags = dto.tags.map((tag) =>
          this.projectTagRepository.create({ ...tag, project }),
        );
        await manager.save(ProjectTagEntity, newTags);

        project.tags = newTags;
      }

      manager.merge(ProjectEntity, project, {
        ...dto,
        latitude: dto.latitude,
        longitude: dto.longitude,
      });

      await manager.save(project);
    });

    return true;
  }

  async findOne(id: string, userId: string) {
    const project = await this.projectRepository.findOne({
      where: {
        id,
        owner: {
          id: userId,
        },
      },
      relations: ['contactPerson', 'document', 'tags'],
    });

    return new FindOneProjectResponseDto(project);
  }

  async findAllInvestment(
    query: FindAllProjectDto,
    userId: string,
  ): Promise<PaginatedResponse<FindAllProjectResponseDto>> {
    const qb = this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.contactPerson', 'contactPerson')
      .leftJoinAndSelect('project.document', 'document')
      .where('project.ownerId = :userId', { userId });

    if (query.search) {
      qb.andWhere('project.name LIKE :search', { search: `%${query.search}%` });
    }

    if (query.propertyType) {
      qb.andWhere('project.propertyType = :propertyType', {
        propertyType: query.propertyType,
      });
    }

    if (query.projectVerifiedStatus) {
      qb.andWhere('project.projectVerifiedStatus = :status', {
        status: query.projectVerifiedStatus,
      });
    }

    if (query.saleStatus) {
      qb.andWhere('project.saleStatus = :saleStatus', {
        saleStatus: query.saleStatus,
      });
    }

    if (query.currentStatus) {
      qb.andWhere('project.currentStatus = :currentStatus', {
        currentStatus: query.currentStatus,
      });
    }

    if (query.fromDate) {
      qb.andWhere('project.createdAt >= :fromDate', {
        fromDate: new Date(query.fromDate),
      });
    }

    if (query.toDate) {
      qb.andWhere('project.createdAt <= :toDate', {
        toDate: new Date(query.toDate),
      });
    }

    if (query.minTotalValue) {
      qb.andWhere('project.proposedValue >= :minValue', {
        minValue: new BigNumber(query.minTotalValue).toFixed(),
      });
    }

    if (query.maxTotalValue) {
      qb.andWhere('project.proposedValue <= :maxValue', {
        maxValue: new BigNumber(query.maxTotalValue).toFixed(),
      });
    }

    qb.orderBy(
      'project.createdAt',
      (query.order ?? 'desc').toUpperCase() as 'ASC' | 'DESC',
    );

    if (!query.getAll) {
      qb.skip(query.offset).take(query.limit);
    }

    const [data, total] = await qb.getManyAndCount();

    return new PaginatedResponse<FindAllProjectResponseDto>(
      data.map((item) => new FindAllProjectResponseDto(item)),
      {
        page: query.page,
        limit: query.limit,
        total,
      },
    );
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const project = await this.findOne(id, userId);
    if (!project) {
      throw new NotFoundException(ErrorCode.PROJECT_NOT_FOUND);
    }

    await this.projectRepository.softDelete(id);
    return true;
  }
}
