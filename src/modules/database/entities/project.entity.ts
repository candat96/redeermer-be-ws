import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { InvestmentInfoEntity } from '@modules/database/entities/investment-info.entity';
import { ProjectDetailEntity } from '@modules/database/entities/project-detail.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('project')
export class ProjectEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: String, nullable: true })
  developer: string;

  @Column({
    type: 'enum',
    enum: ProjectType,
    nullable: false,
  })
  propertyType: ProjectType;

  @Column({
    type: 'enum',
    enum: ProjectVerifiedStatus,
    nullable: false,
    default: ProjectVerifiedStatus.PENDING,
  })
  verifiedStatus: ProjectVerifiedStatus;

  @Column({
    type: 'enum',
    enum: ProjectSaleStatusEnum,
    nullable: false,
    default: ProjectSaleStatusEnum.PENDING,
  })
  projectSaleStatus: ProjectSaleStatusEnum;

  @Column({ type: 'float', nullable: true })
  projectScale: number;

  @Column({ type: String, nullable: true })
  objective: string;

  @Column({ type: String, nullable: true })
  advantages: string;

  @Column({ type: String, nullable: true })
  location: string;

  @Column({ type: String, nullable: true })
  latitude: string;

  @Column({ type: String, nullable: true })
  longitude: string;

  @OneToOne(() => ProjectDetailEntity, (detail) => detail.project, { cascade: true })
  detail: ProjectDetailEntity;

  @OneToOne(() => InvestmentInfoEntity, (info) => info.project, { cascade: true })
  investmentInfo: InvestmentInfoEntity;

  @OneToOne(() => ContactPersonEntity, (contact) => contact.project, {
    cascade: true,
  })
  contactPerson: ContactPersonEntity;

  @OneToOne(() => ProjectDocumentEntity, (doc) => doc.project, { cascade: true })
  document: ProjectDocumentEntity;

  @OneToMany(() => ProjectTagEntity, (tag) => tag.project, { cascade: true })
  tags: ProjectTagEntity[];
}
