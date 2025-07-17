import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('project_documents')
export class ProjectDocumentEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  fileName: string;

  @Column({ type: 'simple-array', nullable: false, default: [] })
  files: string[];

  @Column({ type: String, nullable: false })
  type: string;

  @Column({
    type: 'enum',
    enum: ProjectDocumentVerifyStatusEnum,
    default: ProjectDocumentVerifyStatusEnum.PENDING,
  })
  status: ProjectDocumentVerifyStatusEnum;

  @Column({ type: String, nullable: true })
  note?: string;

  @Column({ type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  @ManyToOne(() => UserEntity, { nullable: true })
  verifiedBy?: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.document, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;
}
