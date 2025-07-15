import { BaseEntity } from '@modules/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('whitelist_email')
export class WhitelistEmailEntity extends BaseEntity {
  @Column({ type: String, nullable: true })
  email: string;
}
