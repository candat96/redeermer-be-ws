import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('contact_person')
export class ContactPersonEntity extends BaseEntity {
  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  position: string;

  @ManyToOne(() => ProjectEntity, (project) => project.contactPerson)
  project: ProjectEntity;
}
