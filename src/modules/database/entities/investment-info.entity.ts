import { BaseEntity } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('investment_info')
export class InvestmentInfoEntity extends BaseEntity {
  @Column({ type: 'float' })
  proposedValue: number;

  @Column({ type: 'float' })
  appraisedValue: number;

  @Column({ type: 'float' })
  pricePerUnit: number;

  @Column({ type: Number })
  totalUnits: number;

  @Column({ type: Number })
  minUnits: number;

  @Column({ type: Number })
  maxUnits: number;

  @OneToOne(() => ProjectEntity, (project) => project.investmentInfo)
  project: ProjectEntity;
}
