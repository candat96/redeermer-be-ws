import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { InvestmentInfoEntity } from '@modules/database/entities/investment-info.entity';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { ProjectFieldReviewEntity } from '@modules/database/entities/project_field_reviews.entity';

export class FindOneProjectResponseDto {
  id: string;
  name: string;
  description: string;
  developer: string;
  propertyType: ProjectType;
  verifiedStatus: ProjectVerifiedStatus;
  projectSaleStatus: ProjectSaleStatusEnum;
  projectScale: string;
  objective: string;
  advantages: string;
  location: string;
  latitude: string;
  longitude: string;
  createdAt: Date;
  detail: ProjectDetailEntity;
  investmentInfo: InvestmentInfoEntity;
  contactPerson: ContactPersonEntity;
  document: ProjectDocumentEntity[];
  tags: ProjectTagEntity[];
  fieldReviews: ProjectFieldReviewEntity[];

  constructor(project: ProjectEntity) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.developer = project.developer;
    this.propertyType = project.propertyType;
    this.verifiedStatus = project.verifiedStatus;
    this.projectSaleStatus = project.projectSaleStatus;
    this.projectScale = project.projectScale;
    this.objective = project.objective;
    this.advantages = project.advantages;
    this.location = project.location;
    this.latitude = project.latitude;
    this.longitude = project.longitude;
    this.createdAt = new Date(project.createdAt);
    this.detail = project.detail;
    this.investmentInfo = project.investmentInfo;
    this.contactPerson = project.contactPerson;
    this.document = project.document;
    this.tags = project.tags;
    this.fieldReviews = project.fieldReviews;
  }
}
