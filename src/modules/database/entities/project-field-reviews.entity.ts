import {
  FieldNameEnum,
  ProjectFieldReviewEnum,
} from '@common/constants/enum/project-field-review.enum';
import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { UserEntity } from '@modules/database/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('project_field_reviews')
export class ProjectFieldReviewEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: FieldNameEnum,
    nullable: false,
  })
  fieldName: FieldNameEnum;

  @Column({
    type: 'enum',
    enum: ProjectFieldReviewEnum,
    default: ProjectFieldReviewEnum.PENDING,
  })
  status: ProjectFieldReviewEnum;

  @Column({ nullable: true })
  reviewerComment?: string;

  @ManyToOne(() => UserEntity)
  reviewer?: UserEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.fieldReviews, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;
}
