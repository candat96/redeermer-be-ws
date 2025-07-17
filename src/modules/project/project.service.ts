import { ErrorCode } from '@common/constants/error.constant';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { InvestmentInfoEntity } from '@modules/database/entities/investment-info.entity';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import { UpdateProjectDto } from '@modules/project/dto/update-project.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

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
  ) {}

  async createProject(dto: CreateProjectDto) {
    const detail = this.projectDetailRepository.create({
      area: dto.detail.area,
      numberOfFloors: dto.detail.numberOfFloors,
      currentStatus: dto.detail.currentStatus,
      estimatedCompletionTime: dto.detail.estimatedCompletionTime,
      legalStatus: dto.detail.legalStatus,
      mediaUrls: dto.detail.mediaUrls,
      floorPlanUrl: dto.detail.floorPlanUrl,
    });

    const investmentInfo = this.investmentInfoRepository.create({
      proposedValue: dto.investmentInfo.proposedValue,
      appraisedValue: dto.investmentInfo.appraisedValue,
      pricePerUnit: dto.investmentInfo.pricePerUnit,
      totalUnits: dto.investmentInfo.totalUnits,
      minUnits: dto.investmentInfo.minUnits,
      maxUnits: dto.investmentInfo.maxUnits,
    });
    const contact = this.contractRepository.create({
      fullName: dto.contactPerson.fullName,
      phone: dto.contactPerson.phone,
      email: dto.contactPerson.email,
      position: dto.contactPerson.position,
    });

    const document = this.projectDocumentRepository.create({
      fileName: dto.documents.fileName,
      files: dto.documents.files,
      type: dto.documents.type,
      status: dto.documents.status,
      note: dto.documents.note,
    });

    const tags = dto.tags?.map((t) => this.projectTagRepository.create(t)) || [];

    await this.projectRepository.manager.transaction(
      async (manager: EntityManager) => {
        const savedDetail = await manager.save(detail);
        const savedInvestment = await manager.save(investmentInfo);
        const savedContact = await manager.save(contact);
        const savedDocument = await manager.save(document);
        const savedTags = await manager.save(tags);

        const project = manager.create(ProjectEntity, {
          ...dto,
          detail: savedDetail,
          investmentInfo: savedInvestment,
          contactPerson: savedContact,
          document: savedDocument,
          tags: savedTags,
        });

        await manager.insert(ProjectEntity, project);
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

      if (project.document) {
        manager.merge(ProjectDocumentEntity, project.document, dto.documents);
        await manager.save(project.document);
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
    return await this.projectRepository.findOne({
      where: { id },
      relations: ['detail', 'investmentInfo', 'contactPerson', 'document', 'tags'],
    });
  }
}
