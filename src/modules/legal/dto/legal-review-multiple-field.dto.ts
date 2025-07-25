import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import {
  FieldNameEnum,
  ProjectFieldReviewEnum,
} from '@common/constants/enum/project-field-review.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class FieldReviewItem {
  @ApiProperty({
    type: FieldNameEnum,
    enum: FieldNameEnum,
    description: 'Field name to review',
  })
  @IsEnum(FieldNameEnum)
  fieldName: FieldNameEnum;

  @ApiProperty({
    type: ProjectFieldReviewEnum,
    enum: ProjectFieldReviewEnum,
    description: 'Review status',
  })
  @IsEnum(ProjectFieldReviewEnum)
  status: ProjectFieldReviewEnum;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Review comment',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}

class DocumentReviewItem {
  @ApiProperty({
    type: String,
    description: 'Document ID to review',
  })
  @IsString()
  documentId: string;

  @ApiProperty({
    type: ProjectDocumentVerifyStatusEnum,
    enum: ProjectDocumentVerifyStatusEnum,
    description: 'Document verification status',
  })
  @IsEnum(ProjectDocumentVerifyStatusEnum)
  status: ProjectDocumentVerifyStatusEnum;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Review comment',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class ReviewProjectFeedbackDto {
  @ApiProperty({
    type: String,
    description: 'Project ID to review',
  })
  @IsString()
  projectId: string;

  @ApiProperty({
    type: [FieldReviewItem],
    description: 'Array of field reviews',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldReviewItem)
  fieldReviews: FieldReviewItem[];

  @ApiProperty({
    type: [DocumentReviewItem],
    description: 'Array of document reviews',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentReviewItem)
  documentReviews: DocumentReviewItem[];
}
