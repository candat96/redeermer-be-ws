import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateProjectDetailDto {
  @ApiProperty({ example: 1200.5, description: 'Total area in square meters' })
  @IsNumber()
  area: number;

  @ApiProperty({ example: 10, description: 'Number of floors' })
  @IsNumber()
  numberOfFloors: number;

  @ApiProperty({ example: 'Under Construction', description: 'Current status' })
  @IsString()
  currentStatus: string;

  @ApiProperty({
    example: '2026-06-30',
    required: false,
    description: 'Estimated completion date',
  })
  @IsOptional()
  @IsDateString()
  estimatedCompletionTime?: Date;

  @ApiProperty({ example: 'Legal title obtained', description: 'Legal status' })
  @IsString()
  legalStatus: string;

  @ApiProperty({
    example: ['https://example.com/image1.jpg'],
    required: false,
    description: 'Media URLs',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @ApiProperty({
    example: 'https://example.com/floorplan.pdf',
    required: false,
    description: 'Floor plan URL',
  })
  @IsOptional()
  @IsString()
  floorPlanUrl?: string;
}

export class CreateInvestmentInfoDto {
  @ApiProperty({
    example: 1000000,
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
}

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
    description: 'List of file URLs (PDFs, images, etc.)',
    example: [
      'https://example.com/uploads/legal-doc-1.pdf',
      'https://example.com/uploads/legal-doc-2.jpg',
    ],
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  files: string[];

  @ApiProperty({
    description: 'Document type (used for categorization)',
    example: 'legal',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

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

export class CreateProjectDto {
  @ApiProperty({ example: 'Sunrise Villas', description: 'Project name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'High-end beachfront villas', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Sun Group', required: false })
  @IsOptional()
  @IsString()
  developer?: string;

  @ApiProperty({ example: 'real_estate', description: 'Property type' })
  @IsString()
  propertyType: string;

  @ApiProperty({
    example: 10000,
    required: false,
    description: 'Project scale (sqm)',
  })
  @IsOptional()
  @IsNumber()
  projectScale?: number;

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

  @ApiProperty({ type: () => CreateProjectDetailDto })
  @ValidateNested()
  @Type(() => CreateProjectDetailDto)
  detail: CreateProjectDetailDto;

  @ApiProperty({ type: () => CreateInvestmentInfoDto, required: true })
  @ValidateNested()
  @Type(() => CreateInvestmentInfoDto)
  investmentInfo: CreateInvestmentInfoDto;

  @ApiProperty({ type: () => CreateContactPersonDto, required: true })
  @ValidateNested()
  @Type(() => CreateContactPersonDto)
  contactPerson: CreateContactPersonDto;

  @ApiProperty({ type: CreateProjectDocumentDto, required: true })
  @ValidateNested()
  @Type(() => CreateProjectDocumentDto)
  documents?: CreateProjectDocumentDto;

  @ApiProperty({ type: [CreateProjectTagDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectTagDto)
  tags?: CreateProjectTagDto[];
}
