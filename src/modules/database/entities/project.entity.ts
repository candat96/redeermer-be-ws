import {
  CurrentStatus,
  LegalStatus,
} from '@common/constants/enum/project-detail.enum';
import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { BaseEntity, NumberColumn } from '@modules/database/entities/base.entity';
import { ContactPersonEntity } from '@modules/database/entities/contract-person.entity';
import { ProjectDocumentEntity } from '@modules/database/entities/project-document.entity';
import { ProjectFieldReviewEntity } from '@modules/database/entities/project-field-reviews.entity';
import { ProjectTagEntity } from '@modules/database/entities/project-tag.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import BigNumber from 'bignumber.js';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('project')
export class ProjectEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
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

  @Column({ type: String, nullable: false })
  projectScale: string;

  @Column({ type: String, nullable: true })
  objective: string;

  @Column({ type: String, nullable: true })
  advantages: string;

  @Column({ type: String, nullable: false })
  location: string;

  @Column({ type: String, nullable: false })
  latitude: string;

  @Column({ type: String, nullable: false })
  longitude: string;

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

  @NumberColumn('bigint', { default: 0 })
  proposedValue: BigNumber;

  @NumberColumn('bigint', { default: 0 })
  appraisedValue: BigNumber;

  @NumberColumn('bigint', { default: 0 })
  pricePerUnit: BigNumber;

  @Column({ type: Number, default: 0 })
  totalUnits: number;

  @Column({ type: Number })
  minUnits: number;

  @Column({ type: Number })
  maxUnits: number;

  @OneToMany(() => ContactPersonEntity, (contact) => contact.project, {
    cascade: true,
  })
  contactPerson: ContactPersonEntity[];

  @OneToMany(() => ProjectDocumentEntity, (doc) => doc.project, { cascade: true })
  document: ProjectDocumentEntity[];

  @OneToMany(() => ProjectTagEntity, (tag) => tag.project, { cascade: true })
  tags: ProjectTagEntity[];

  @OneToMany(() => ProjectFieldReviewEntity, (field) => field.project, {
    cascade: true,
  })
  fieldReviews: ProjectFieldReviewEntity[];

  @ManyToOne(() => UserEntity, (user) => user.projects, { nullable: false })
  owner: UserEntity;
}
