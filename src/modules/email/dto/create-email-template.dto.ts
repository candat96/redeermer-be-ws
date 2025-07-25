import {
  EmailTemplateScope,
  EmailTemplateStatus,
} from '@common/constants/enum/email.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEmailTemplateDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Email template title',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Email template content',
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    type: EmailTemplateScope,
    enum: EmailTemplateScope,
    example: EmailTemplateScope.NOTIFICATION,
    required: true,
    description: 'Email template scope',
  })
  @IsOptional()
  scope: EmailTemplateScope;

  @ApiProperty({
    type: EmailTemplateStatus,
    enum: EmailTemplateStatus,
    example: EmailTemplateStatus.ACTIVE,
    required: true,
    description: 'Email template status',
  })
  @IsOptional()
  status: EmailTemplateStatus.ACTIVE;
}
