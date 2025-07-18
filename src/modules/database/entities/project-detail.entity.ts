import {
  CurrentStatus,
  LegalStatus,
} from '@common/constants/enum/project-detail.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('project_details')
export class ProjectDetailEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  area: string;

  @Column({ type: Number, nullable: false })
  numberOfFloors: number;

  @Column({ type: 'enum', enum: CurrentStatus, nullable: false })
  currentStatus: CurrentStatus;

  @Column({ type: 'date', nullable: true })
  estimatedCompletionTime: Date;

  @Column({
    type: 'enum',
    enum: LegalStatus,
    nullable: false,
    default: LegalStatus.NOT_VERIFIED,
  })
  legalStatus: LegalStatus;

  @OneToOne(() => ProjectEntity, (project) => project.detail)
  @JoinColumn()
  project: ProjectEntity;
}
