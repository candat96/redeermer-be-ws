import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
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
  area: string;
  numberOfFloors: number;
  currentStatus: string;
  estimatedCompletionTime: Date;
  legalStatus: string;
  proposedValue: BigNumber;
  appraisedValue: BigNumber;
  pricePerUnit: BigNumber;
  totalUnits: number;
  minUnits: number;
  maxUnits: number;
  contactPerson: ContactPersonEntity[];
  document: ProjectDocumentEntity[];
  tags: ProjectTagEntity[];
  fieldReviews: ProjectFieldReviewEntity[];
  createdAt: Date;

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
    this.area = project.area;
    this.numberOfFloors = project.numberOfFloors;
    this.currentStatus = project.currentStatus;
    this.estimatedCompletionTime = project.estimatedCompletionTime;
    this.legalStatus = project.legalStatus;
    this.proposedValue = project.proposedValue;
    this.appraisedValue = project.appraisedValue;
    this.pricePerUnit = project.pricePerUnit;
    this.totalUnits = project.totalUnits;
    this.minUnits = project.minUnits;
    this.maxUnits = project.maxUnits;
    this.contactPerson = project.contactPerson;
    this.document = project.document;
    this.tags = project.tags;
    this.fieldReviews = project.fieldReviews;
    this.createdAt = new Date(project.createdAt);
  }
}
