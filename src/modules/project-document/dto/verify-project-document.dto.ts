import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class VerifyProjectDocumentDto {
  @IsEnum(ProjectDocumentVerifyStatusEnum)
  status: ProjectDocumentVerifyStatusEnum;

  @IsOptional()
  @IsString()
  note?: string;
}
