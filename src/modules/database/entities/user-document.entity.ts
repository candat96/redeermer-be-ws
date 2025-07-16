import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_document')
export class UserDocumentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'simple-array', nullable: false, default: [] })
  urls: string[];

  @Column({
    type: 'enum',
    enum: UserDocumentVerifyStatusEnum,
    default: UserDocumentVerifyStatusEnum.PENDING,
  })
  status: UserDocumentVerifyStatusEnum;

  @Column({ nullable: true })
  verifiedAt?: Date;

  @ManyToOne(() => UserEntity, { nullable: true })
  verifiedBy?: UserEntity;

  @Column({ nullable: true })
  note?: string;

  @ManyToOne(() => UserEntity, (user) => user.documents)
  user: UserEntity;
}
