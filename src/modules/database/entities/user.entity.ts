import { UserGender, UserRole, UserStatus } from '@common/constants/enum/user.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

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
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
