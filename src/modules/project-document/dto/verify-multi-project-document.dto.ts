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
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  documentIds: string[];

  @ApiProperty()
  @IsEnum(ProjectDocumentVerifyStatusEnum)
  status: ProjectDocumentVerifyStatusEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  note?: string;
}
