import { BaseEntity } from '@modules/database/entities/base.entity';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { InvestmentInfoEntity } from '@modules/database/entities/investment-info.entity';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('project')
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  developer: string;

  @Column()
  propertyType: string;

  @Column({ type: 'float', nullable: true })
  projectScale: number;

  @Column({ nullable: true })
  objective: string;

  @Column({ nullable: true })
  advantages: string;

  @Column()
  location: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @OneToOne(() => ProjectDetailEntity, (detail) => detail.project, { cascade: true })
  detail: ProjectDetailEntity;

  @OneToOne(() => InvestmentInfoEntity, (info) => info.project, { cascade: true })
  investmentInfo: InvestmentInfoEntity;

  @OneToOne(() => ContactPersonEntity, (contact) => contact.project, {
    cascade: true,
  })
  contactPerson: ContactPersonEntity;

  @OneToMany(() => ProjectDocumentEntity, (doc) => doc.project, { cascade: true })
  documents: ProjectDocumentEntity[];

  @OneToMany(() => ProjectDocumentEntity, (tag) => tag.project, { cascade: true })
  tags: ProjectTagEntity[];
}
