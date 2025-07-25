import { ApiMessageKey } from '@common/constants/message.constant';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

interface IPagination {
  page: number;
  limit: number;
  total: number;
}

export class Pagination {
  @ApiProperty({
    type: Number,
    description: 'Current page number',
  })
  @ApiResponseProperty()
  readonly page: number;

  @ApiProperty({
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponseProperty()
  readonly limit: number;

  @ApiProperty({
    type: Number,
    description: 'Total number of items',
  })
  @ApiResponseProperty()
  readonly total: number;

  @ApiProperty({
    type: Number,
    description: 'Total number of pages',
  })
  @ApiResponseProperty()
  readonly totalPage: number;

  @ApiProperty({
    type: Boolean,
    description: 'Whether there is a previous page',
  })
  @ApiResponseProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty({
    type: Boolean,
    description: 'Whether there is a next page',
  })
  @ApiResponseProperty()
  readonly hasNextPage: boolean;

  constructor(props: IPagination) {
    this.page = props.page;
    this.limit = props.limit;
    this.total = props.total;
    this.totalPage = Math.ceil(this.total / this.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.totalPage;
  }
}

export interface IApiResponse {
  statusCode: HttpStatus;
  data: any;
  pagination: IPagination | null;
  message: ApiMessageKey;
  metadata?: Record<string, any>;
}

export class PaginatedResponse<T> {
  data: T[];
  pagination: IPagination;

  constructor(data: T[], pagination: IPagination) {
    this.data = data;
    this.pagination = pagination;
  }
}

export class ApiResponseDto<T> {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
    description: 'HTTP status code',
  })
  @ApiResponseProperty()
  statusCode: HttpStatus;

  @ApiProperty({
    description: 'Response data',
  })
  @ApiResponseProperty()
  data: T;

  @ApiProperty({
    type: Pagination,
    required: false,
    description: 'Pagination information',
  })
  @ApiResponseProperty()
  pagination?: Pagination;

  @ApiProperty({
    type: Object,
    required: false,
    description: 'Additional metadata',
  })
  @ApiResponseProperty()
  metadata?: Record<string, any>;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Response message',
  })
  @ApiResponseProperty()
  message?: string;

  constructor(props: IApiResponse) {
    this.statusCode = props.statusCode;
    this.data = props.data;
    this.pagination = props.pagination ? new Pagination(props.pagination) : null;
    this.metadata = props.metadata || null;
    this.message = props.message;
  }
}

export class FindAndCountResponse<T> {
  data: T[];
  total: number;

  constructor(data: T[], total: number) {
    this.data = data;
    this.total = total;
  }
}
