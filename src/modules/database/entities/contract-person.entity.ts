import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('contact_person')
export class ContactPersonEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  fullName: string;

  @Column({ type: String, nullable: false })
  email: string;

  @Column({ type: String, nullable: false })
  phone: string;

  @Column({ type: String, nullable: true })
  position: string;

  @ManyToOne(() => ProjectEntity, (project) => project.contactPerson)
  project: ProjectEntity;
}
