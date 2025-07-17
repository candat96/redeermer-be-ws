import {
  EmailTemplateScope,
  EmailTemplateStatus,
} from '@common/constants/enum/email.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('email_template')
export class EmailTemplateEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({
    type: 'enum',
    enum: EmailTemplateScope,
    nullable: false,
    default: EmailTemplateScope.NOTIFICATION,
  })
  scope: EmailTemplateScope;

  @Column({
    type: 'enum',
    enum: EmailTemplateStatus,
    nullable: false,
    default: EmailTemplateStatus.ACTIVE,
  })
  status: EmailTemplateStatus;
}
