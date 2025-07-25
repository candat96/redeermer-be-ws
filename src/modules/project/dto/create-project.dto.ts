import {
  CurrentStatus,
  LegalStatus,
} from '@common/constants/enum/project-detail.enum';
import {
  ProjectDocumentType,
  ProjectDocumentVerifyStatusEnum,
} from '@common/constants/enum/project-document.enum';
import {
  FieldNameEnum,
  ProjectFieldReviewEnum,
} from '@common/constants/enum/project-field-review.enum';
import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateContactPersonDto {
  @ApiProperty({ example: 'John Doe', description: 'Contact name' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: '+123456789', description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'AAAA', description: 'position' })
  @IsString()
  position: string;
}

export class CreateProjectDocumentDto {
  @ApiProperty({
    description: 'Document title or identifier',
    example: 'Legal Ownership Certificate',
  })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({
    description: ' file URL (PDFs, images, etc.)',
    example: 'https://example.com/uploads/legal-doc-1.pdf',
  })
  @IsString()
  @IsNotEmpty()
  files: string;

  @ApiProperty({
    description: 'Document type',
    enum: ProjectDocumentType,
    default: ProjectDocumentType,
    example: ProjectDocumentType.PROJECT_DETAIL,
  })
  @IsEnum(ProjectDocumentType)
  type: ProjectDocumentType;

  @ApiProperty({
    description: 'Document verification status',
    enum: ProjectDocumentVerifyStatusEnum,
    default: ProjectDocumentVerifyStatusEnum.PENDING,
    example: ProjectDocumentVerifyStatusEnum.PENDING,
  })
  @IsEnum(ProjectDocumentVerifyStatusEnum)
  @IsOptional()
  status?: ProjectDocumentVerifyStatusEnum;

  @ApiProperty({
    description: 'Optional note from the admin or uploader',
    example: 'Awaiting verification by legal team',
    required: false,
  })
  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateProjectTagDto {
  @ApiProperty({ example: 'Luxury', description: 'Tag name' })
  @IsString()
  name: string;
}

export class CreateFieldReviewDto {
  @ApiProperty({
    enum: FieldNameEnum,
    description: 'fieldName',
  })
  @IsEnum(FieldNameEnum)
  fieldName: FieldNameEnum;

  @ApiProperty({
    enum: ProjectFieldReviewEnum,
    example: ProjectFieldReviewEnum.PENDING,
    description: 'verified status',
  })
  @IsEnum(ProjectFieldReviewEnum)
  status: ProjectFieldReviewEnum;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Reviewer comment',
  })
  @IsString()
  @IsOptional()
  reviewerComment?: string;
}

export class CreateProjectDto {
  @ApiProperty({ example: 'Sunrise Villas', description: 'Project name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'High-end beachfront villas', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Sun Group', required: false })
  @IsOptional()
  @IsString()
  developer?: string;

  @ApiProperty({
    enum: ProjectType,
    example: ProjectType.OTHER,
    description: 'Type of the project (e.g., Residential, Commercial, etc.)',
  })
  @IsEnum(ProjectType)
  @IsNotEmpty()
  propertyType: ProjectType;

  @ApiProperty({
    enum: ProjectVerifiedStatus,
    example: ProjectVerifiedStatus.PENDING,
    description:
      'Verification status of the project (e.g., PENDING, APPROVED, REJECTED)',
  })
  @IsEnum(ProjectVerifiedStatus)
  @IsNotEmpty()
  projectVerifiedStatus: ProjectVerifiedStatus;

  @ApiProperty({
    enum: ProjectSaleStatusEnum,
    example: ProjectSaleStatusEnum.ON_SALE,
    description:
      'Sale status of the project (e.g., ON_SALE, SOLD, PENDING, CANCELLED)',
  })
  @IsEnum(ProjectSaleStatusEnum)
  @IsNotEmpty()
  saleStatus: ProjectSaleStatusEnum;

  @ApiProperty({
    example: '10000',
    required: false,
    description: 'Project scale (sqm)',
  })
  @IsOptional()
  @IsString()
  projectScale?: string;

  @ApiProperty({ example: 'Vacation homes for investors', required: false })
  @IsOptional()
  @IsString()
  objective?: string;

  @ApiProperty({ example: 'Beachfront location, modern design', required: false })
  @IsOptional()
  @IsString()
  advantages?: string;

  @ApiProperty({
    example: '123 Beach St, Miami, FL',
    description: 'Project location',
  })
  @IsString()
  location: string;

  @ApiProperty({ example: 25.774, required: false })
  @IsOptional()
  @IsString()
  latitude?: string;

  @ApiProperty({ example: -80.193, required: false })
  @IsOptional()
  @IsString()
  longitude?: string;

  @ApiProperty({ example: '1200.5', description: 'Total area in square meters' })
  @IsString()
  area: string;

  @ApiProperty({ example: 10, description: 'Number of floors' })
  @IsNumber()
  numberOfFloors: number;

  @ApiProperty({
    description: 'Under Construction',
    enum: CurrentStatus,
    default: CurrentStatus.COMPLETED,
    example: CurrentStatus.COMPLETED,
  })
  @IsEnum(CurrentStatus)
  currentStatus?: CurrentStatus;

  @ApiProperty({
    example: '2026-06-30',
    required: false,
    description: 'Estimated completion date',
  })
  @IsOptional()
  @IsDateString()
  estimatedCompletionTime?: Date;

  @ApiProperty({
    description: 'Legal status',
    enum: LegalStatus,
    default: LegalStatus.NOT_VERIFIED,
    example: LegalStatus.NOT_VERIFIED,
  })
  @IsEnum(LegalStatus)
  legalStatus?: LegalStatus;

  @ApiProperty({
    example: '1000000',
    description: 'Proposed investment value for the project (e.g., 1,000,000 USD)',
  })
  @IsNumber()
  proposedValue: number;

  @ApiProperty({
    example: 950000,
    description: 'Appraised value for the project based on valuation reports',
  })
  @IsNumber()
  appraisedValue: number;

  @ApiProperty({
    example: 500,
    description: 'Price per investment unit (e.g., 500 USD per unit)',
  })
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty({
    example: 2000,
    description: 'Total available investment units for the project',
  })
  @IsNumber()
  totalUnits: number;

  @ApiProperty({
    example: 10,
    description: 'Minimum number of units an investor can purchase',
  })
  @IsNumber()
  minUnits: number;

  @ApiProperty({
    example: 500,
    description: 'Maximum number of units an investor can purchase',
  })
  @IsNumber()
  maxUnits: number;

  @ApiProperty({ type: () => [CreateContactPersonDto], required: true })
  @ValidateNested()
  @Type(() => CreateContactPersonDto)
  @IsNotEmpty()
  contactPerson: CreateContactPersonDto[];

  @ApiProperty({ type: [CreateProjectDocumentDto], required: true })
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDocumentDto)
  @IsNotEmpty()
  documents?: CreateProjectDocumentDto[];

  @ApiProperty({ type: [CreateProjectTagDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectTagDto)
  tags?: CreateProjectTagDto[];
}
