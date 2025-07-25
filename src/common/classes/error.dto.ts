import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    type: Number,
    description: 'HTTP status code',
  })
  @ApiResponseProperty()
  statusCode: number;

  @ApiProperty({
    type: Date,
    description: 'Error timestamp',
  })
  @ApiResponseProperty()
  timestamp: Date | string;

  @ApiProperty({
    type: String,
    description: 'Request path',
  })
  @ApiResponseProperty()
  path: string;

  @ApiProperty({
    type: String,
    description: 'Error message',
  })
  @ApiResponseProperty()
  message: string;
}
