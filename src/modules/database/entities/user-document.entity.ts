import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_document')
export class UserDocumentEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: 'simple-array', nullable: false, default: [] })
  urls: string[];

  @Column({
    type: 'enum',
    enum: UserDocumentVerifyStatusEnum,
    default: UserDocumentVerifyStatusEnum.PENDING,
  })
  status: UserDocumentVerifyStatusEnum;

  @Column({ type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  @ManyToOne(() => UserEntity, { nullable: true })
  verifiedBy?: UserEntity;

  @Column({ type: 'text', nullable: true })
  note?: string;

  @ManyToOne(() => UserEntity, (user) => user.documents)
  user: UserEntity;
}
