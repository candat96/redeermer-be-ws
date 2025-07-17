import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('project_tag')
export class ProjectTagEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tags)
  project: ProjectEntity;
}
