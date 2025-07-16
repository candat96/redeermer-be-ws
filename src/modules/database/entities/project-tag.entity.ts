import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, ManyToOne } from 'typeorm';

export class ProjectTagEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.tags)
  project: ProjectEntity;
}
