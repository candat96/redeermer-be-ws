import {
  EmailTemplateScope,
  EmailTemplateStatus,
} from '@common/constants/enum/email.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEmailTemplateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    type: EmailTemplateScope,
    enum: EmailTemplateScope,
    example: EmailTemplateScope.NOTIFICATION,
    required: true,
  })
  @IsOptional()
  scope: EmailTemplateScope;

  @ApiProperty({
    type: EmailTemplateStatus,
    enum: EmailTemplateStatus,
    example: EmailTemplateStatus.ACTIVE,
    required: true,
  })
  @IsOptional()
  status: EmailTemplateStatus.ACTIVE;
}
