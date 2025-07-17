import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

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

  @OneToOne(() => ProjectEntity, (project) => project.contactPerson)
  @JoinColumn()
  project: ProjectEntity;
}
