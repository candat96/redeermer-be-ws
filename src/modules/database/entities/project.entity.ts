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
import { ProjectFieldReviewEntity } from '@modules/database/entities/project_field_reviews.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';

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

  @OneToOne(() => ProjectDetailEntity, (detail) => detail.project, { cascade: true })
  detail: ProjectDetailEntity;

  @OneToOne(() => InvestmentInfoEntity, (info) => info.project, { cascade: true })
  investmentInfo: InvestmentInfoEntity;

  @OneToOne(() => ContactPersonEntity, (contact) => contact.project, {
    cascade: true,
  })
  contactPerson: ContactPersonEntity;

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
