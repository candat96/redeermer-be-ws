import { PaginatedResponse } from '@common/classes/response.dto';
import {
  FieldNameEnum,
  ProjectFieldReviewEnum,
} from '@common/constants/enum/project-field-review.enum';
import { ErrorCode } from '@common/constants/error.constant';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { InvestmentInfoEntity } from '@modules/database/entities/investment-info.entity';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { ProjectFieldReviewEntity } from '@modules/database/entities/project_field_reviews.entity';
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
import { EntityManager, ILike, Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProjectDetailEntity)
    private readonly projectDetailRepository: Repository<ProjectDetailEntity>,
    @InjectRepository(ContactPersonEntity)
    private readonly contractRepository: Repository<ContactPersonEntity>,
    @InjectRepository(InvestmentInfoEntity)
    private readonly investmentInfoRepository: Repository<InvestmentInfoEntity>,
    @InjectRepository(ProjectDocumentEntity)
    private readonly projectDocumentRepository: Repository<ProjectDocumentEntity>,
    @InjectRepository(ProjectTagEntity)
    private readonly projectTagRepository: Repository<ProjectTagEntity>,
    @InjectRepository(ProjectFieldReviewEntity)
    private readonly projectFileReviewRepository: Repository<ProjectFieldReviewEntity>,
  ) {}

  async createProject(dto: CreateProjectDto, userId: string) {
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
          owner: manager.create(UserEntity, { id: userId }),
        });

        await manager.insert(ProjectEntity, project);

        const detail = manager.create(ProjectDetailEntity, {
          area: dto.detail.area,
          numberOfFloors: dto.detail.numberOfFloors,
          currentStatus: dto.detail.currentStatus,
          estimatedCompletionTime: dto.detail.estimatedCompletionTime,
          legalStatus: dto.detail.legalStatus,
          project: manager.create(ProjectEntity, { id: project.id }),
        });

        await manager.insert(ProjectDetailEntity, detail);

        const investmentInfo = manager.create(InvestmentInfoEntity, {
          proposedValue: dto.investmentInfo.proposedValue,
          appraisedValue: dto.investmentInfo.appraisedValue,
          pricePerUnit: dto.investmentInfo.pricePerUnit,
          totalUnits: dto.investmentInfo.totalUnits,
          minUnits: dto.investmentInfo.minUnits,
          maxUnits: dto.investmentInfo.maxUnits,
          project: manager.create(ProjectEntity, { id: project.id }),
        });

        await manager.insert(InvestmentInfoEntity, investmentInfo);

        const contact = manager.create(ContactPersonEntity, {
          fullName: dto.contactPerson.fullName,
          phone: dto.contactPerson.phone,
          email: dto.contactPerson.email,
          position: dto.contactPerson.position,
          project: manager.create(ProjectEntity, { id: project.id }),
        });
        await manager.insert(ContactPersonEntity, contact);

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

        return true;
      },
    );
  }

  async updateProject(id: string, dto: UpdateProjectDto) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['detail', 'investmentInfo', 'contactPerson', 'document', 'tags'],
    });

    if (!project) {
      throw new NotFoundException(ErrorCode.PROJECT_NOT_FOUND);
    }

    await this.projectRepository.manager.transaction(async (manager) => {
      if (project.detail) {
        manager.merge(ProjectDetailEntity, project.detail, dto.detail);
        await manager.save(project.detail);
      }

      if (project.investmentInfo) {
        manager.merge(
          InvestmentInfoEntity,
          project.investmentInfo,
          dto.investmentInfo,
        );
        await manager.save(project.investmentInfo);
      }

      if (project.contactPerson) {
        manager.merge(ContactPersonEntity, project.contactPerson, dto.contactPerson);
        await manager.save(project.contactPerson);
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

  async findOne(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['detail', 'investmentInfo', 'contactPerson', 'document', 'tags'],
    });

    return new FindOneProjectResponseDto(project);
  }

  async findAllInvestment(query: FindAllProjectDto, userId: string) {
    const [data, total] = await this.projectRepository.findAndCount({
      where: {
        name: query.search ? ILike(`%${query.search}%`) : undefined,
        owner: { id: userId },
      },
      relations: {
        investmentInfo: true,
        detail: true,
        contactPerson: true,
        document: true,
      },
      take: !query.getAll ? query.limit : undefined,
      skip: !query.getAll ? query.offset : undefined,
      order: { createdAt: query.order },
    });

    return new PaginatedResponse<FindAllProjectResponseDto>(
      data.map((item) => new FindAllProjectResponseDto(item)),
      {
        page: query.page,
        limit: query.limit,
        total: total,
      },
    );
  }

  async delete(id: string) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException(ErrorCode.PROJECT_NOT_FOUND);
    }

    await this.projectRepository.softDelete(id);
    return true;
  }
}
