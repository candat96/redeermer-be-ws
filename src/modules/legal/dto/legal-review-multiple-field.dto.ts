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
  @ApiProperty()
  @IsEnum(FieldNameEnum)
  fieldName: FieldNameEnum;

  @ApiProperty()
  @IsEnum(ProjectFieldReviewEnum)
  status: ProjectFieldReviewEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string;
}

class DocumentReviewItem {
  @ApiProperty()
  @IsString()
  documentId: string;

  @ApiProperty()
  @IsEnum(ProjectDocumentVerifyStatusEnum)
  status: ProjectDocumentVerifyStatusEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string;
}

export class ReviewProjectFeedbackDto {
  @ApiProperty()
  @IsString()
  projectId: string;

  @ApiProperty({ type: [FieldReviewItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldReviewItem)
  fieldReviews: FieldReviewItem[];

  @ApiProperty({ type: [DocumentReviewItem] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentReviewItem)
  documentReviews: DocumentReviewItem[];
}
