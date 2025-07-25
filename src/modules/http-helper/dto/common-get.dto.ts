import { HttpHeaders, HttpParams } from '@common/interfaces/http.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CommonGetDto {
  @ApiProperty({
    description: 'URL to make GET request to',
    example: 'https://api.example.com/data',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({
    description: 'Query parameters for the request',
    example: { page: 1, limit: 10 },
  })
  @IsOptional()
  params?: HttpParams;

  @ApiPropertyOptional({
    description: 'Headers for the request',
    example: { Authorization: 'Bearer token' },
  })
  @IsOptional()
  headers?: HttpHeaders;
}
