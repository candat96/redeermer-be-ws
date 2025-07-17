import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('project_details')
export class ProjectDetailEntity extends BaseEntity {
  @Column({ type: 'float', nullable: false })
  area: number;

  @Column({ type: Number, nullable: true })
  numberOfFloors: number;

  @Column()
  currentStatus: string;

  @Column({ type: 'date', nullable: true })
  estimatedCompletionTime: Date;

  @Column({ type: String, nullable: true })
  legalStatus: string;

  @Column('text', { array: true, nullable: true })
  mediaUrls: string[];

  @Column({ type: 'text', nullable: true })
  floorPlanUrl: string;

  @OneToOne(() => ProjectEntity, (project) => project.detail)
  project: ProjectEntity;
}
