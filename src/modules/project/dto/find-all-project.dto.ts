import { RangeDateRequestDto } from '@common/classes/request.dto';
import { CurrentStatus } from '@common/constants/enum/project-detail.enum';
import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectFieldReviewEntity } from '@modules/database/entities/project-field-reviews.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

export class FindAllProjectDto extends RangeDateRequestDto {
  @ApiProperty({
    enum: ProjectType,
    description: 'Type of the project (e.g., Residential, Commercial, etc.)',
    required: false,
    example: ProjectType.VILLA,
  })
  @IsOptional()
  @IsEnum(ProjectType)
  propertyType: ProjectType;

  @ApiProperty({
    enum: ProjectVerifiedStatus,
    description:
      'Verification status of the project (e.g., PENDING, APPROVED, REJECTED)',
    required: false,
    example: ProjectVerifiedStatus.PENDING,
  })
  @IsOptional()
  @IsEnum(ProjectVerifiedStatus)
  projectVerifiedStatus: ProjectVerifiedStatus;

  @ApiProperty({
    enum: ProjectSaleStatusEnum,
    description:
      'Sale status of the project (e.g., ON_SALE, SOLD, PENDING, CANCELLED)',
    required: false,
    example: ProjectSaleStatusEnum.ON_SALE,
  })
  @IsOptional()
  @IsEnum(ProjectSaleStatusEnum)
  saleStatus: ProjectSaleStatusEnum;

  @ApiProperty({
    enum: CurrentStatus,
    description:
      'Current status of the project (e.g., ON_SALE, SOLD, PENDING, CANCELLED)',
    required: false,
    example: CurrentStatus.COMPLETED,
  })
  @IsOptional()
  @IsEnum(CurrentStatus)
  currentStatus: CurrentStatus;

  @ApiProperty({
    description: 'Minimum total project value',
    required: false,
    example: 1000000,
    type: Number,
  })
  @IsOptional()
  @IsNumberString()
  minTotalValue: number;

  @ApiProperty({
    description: 'Maximum total project value',
    required: false,
    example: 5000000,
    type: Number,
  })
  @IsOptional()
  @IsNumberString()
  maxTotalValue: number;
}

export class FindAllProjectResponseDto {
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
  proposedValue: string;
  appraisedValue: string;
  pricePerUnit: string;
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
    this.proposedValue = project.proposedValue.toString();
    this.appraisedValue = project.appraisedValue.toString();
    this.pricePerUnit = project.pricePerUnit.toString();
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
