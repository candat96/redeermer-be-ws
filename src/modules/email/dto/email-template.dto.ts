import { PageRequestDto } from '@common/classes/request.dto';
import { EmailTemplateScope } from '@common/constants/enum/email.enum';
import { EmailTemplateEntity } from '@modules/database/entities/email-template.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EmailTemplateDto extends PageRequestDto {
  @ApiProperty({
    type: EmailTemplateScope,
    enum: EmailTemplateScope,
    example: EmailTemplateScope.NOTIFICATION,
    required: true,
  })
  @IsOptional()
  scope: EmailTemplateScope;
}

export class EmailTemplateResponseDto {
  id: string;
  title: string;
  content: string;
  scope: string;
  status: string;
  createdAt: Date;

  constructor(props: EmailTemplateEntity) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.scope = props.scope;
    this.status = props.status;
    this.createdAt = props.createdAt;
  }
}
