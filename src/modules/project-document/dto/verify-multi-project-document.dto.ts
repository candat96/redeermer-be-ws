import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from 'class-validator';

export class VerifyMultipleProjectDocumentsDto {
  @ApiProperty({
    type: [String],
    description: 'Array of document IDs to verify',
  })
  @IsArray()
  @ArrayNotEmpty()
  documentIds: string[];

  @ApiProperty({
    type: ProjectDocumentVerifyStatusEnum,
    enum: ProjectDocumentVerifyStatusEnum,
    description: 'Verification status',
  })
  @IsEnum(ProjectDocumentVerifyStatusEnum)
  status: ProjectDocumentVerifyStatusEnum;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Verification note',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
