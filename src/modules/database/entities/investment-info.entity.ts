import { BaseEntity, NumberColumn } from '@modules/database/entities/base.entity';
import { ProjectEntity } from '@modules/database/entities/project.entity';
import BigNumber from 'bignumber.js';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('investment_info')
export class InvestmentInfoEntity extends BaseEntity {
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

  @OneToOne(() => ProjectEntity, (project) => project.investmentInfo)
  project: ProjectEntity;
}
