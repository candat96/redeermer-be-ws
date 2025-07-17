import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { InvestmentInfoEntity } from '@modules/database/entities/investment-info.entity';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import { Injectable } from '@nestjs/common';
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
}
