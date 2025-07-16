import { ProjectDocumentVerifyStatusEnum } from '@common/constants/enum/project-document.enum';
import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('project_documents')
export class ProjectDocumentEntity extends BaseEntity {
  @Column()
  fileName: string;

  @Column()
  fileUrl: string;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: ProjectDocumentVerifyStatusEnum,
    default: ProjectDocumentVerifyStatusEnum.PENDING,
  })
  status: UserDocumentVerifyStatusEnum;

  @ManyToOne(() => ProjectEntity, (project) => project.documents)
  project: ProjectEntity;
}
