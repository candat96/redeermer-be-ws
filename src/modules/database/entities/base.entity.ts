import { BigNumberTransform } from '@common/decorators/big-number-transform.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import BigNumber from 'bignumber.js';
import { Type } from 'class-transformer';
import {
  Column,
  ColumnOptions,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}

export const bigNumberTransformer: ValueTransformer = {
  from(value: string): BigNumber {
    return value ? new BigNumber(value) : null;
  },

  to(value: BigNumber): string {
    return value?.toString();
  },
};
export function NumberColumn(
  type: 'bigint' | 'int' | 'decimal' | 'varchar' = 'decimal',
  opts?: ColumnOptions,
) {
  const initial: ColumnOptions = {};
  if (type === 'decimal') {
    initial.precision = 20;
    initial.scale = 0;
  }

  const colFn = Column({
    type,
    transformer: bigNumberTransformer,
    ...initial,
    ...opts,
  });

  const apiFn = opts?.nullable
    ? ApiPropertyOptional({ type: 'string', format: 'number' })
    : ApiProperty({ type: 'string', format: 'number' });

  return function (target: any, key: string) {
    colFn(target, key);
    BigNumberTransform()(target, key);
    apiFn(target, key);
    Type(() => String, {})(target, key);
  };
}
