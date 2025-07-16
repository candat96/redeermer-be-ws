import {
  KycStatus,
  UserGender,
  UserRole,
  UserStatus,
} from '@common/constants/enum/user.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { UserDocumentEntity } from '@modules/database/entities/user-document.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: String, nullable: true })
  email: string;

  @Column({ type: String, nullable: true })
  password: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    nullable: true,
  })
  gender: UserGender;

  @Column({ type: Date, nullable: true })
  birthday: Date;

  @Column({ type: 'text', nullable: true })
  avatar: string;

  @Column({ type: 'text', nullable: true })
  background: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.INVESTOR,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ type: 'enum', enum: KycStatus, default: KycStatus.UNVERIFIED })
  kycStatus: KycStatus;

  @OneToMany(() => UserDocumentEntity, (doc) => doc.user)
  documents: UserDocumentEntity[];
}
