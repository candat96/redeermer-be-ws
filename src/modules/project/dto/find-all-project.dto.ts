import { RangeDateRequestDto } from '@common/classes/request.dto';
import { CurrentStatus } from '@common/constants/enum/project-detail.enum';
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
import { UserEntity } from '@modules/database/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class FindAllProjectDto extends RangeDateRequestDto {
  @ApiProperty({
    enum: ProjectType,
    description: 'Type of the project (e.g., Residential, Commercial, etc.)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectType)
  propertyType: ProjectType;

  @ApiProperty({
    enum: ProjectVerifiedStatus,
    description:
      'Verification status of the project (e.g., PENDING, APPROVED, REJECTED)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectVerifiedStatus)
  projectVerifiedStatus: ProjectVerifiedStatus;

  @ApiProperty({
    enum: ProjectSaleStatusEnum,
    description:
      'Sale status of the project (e.g., ON_SALE, SOLD, PENDING, CANCELLED)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectSaleStatusEnum)
  saleStatus: ProjectSaleStatusEnum;

  @ApiProperty({
    enum: CurrentStatus,
    description:
      'Current status of the project (e.g., ON_SALE, SOLD, PENDING, CANCELLED)',
    required: false,
  })
  @IsOptional()
  @IsEnum(CurrentStatus)
  currentStatus: CurrentStatus;

  @ApiProperty({ description: 'Minimum total project value', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minTotalValue: number;

  @ApiProperty({ description: 'Maximum total project value', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
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
  createdAt: Date;
  detail: ProjectDetailEntity;
  investmentInfo: InvestmentInfoEntity;
  contactPerson: ContactPersonEntity;
  document: ProjectDocumentEntity[];
  tags: ProjectTagEntity[];
  fieldReviews: ProjectFieldReviewEntity[];
  owner: UserEntity;

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
    this.owner = project.owner;
  }
}
