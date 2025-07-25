import { HttpHeaders, HttpParams } from '@common/interfaces/http.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CommonPostDto {
  @ApiProperty({
    description: 'URL to make POST request to',
    example: 'https://api.example.com/data',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Request body data',
    example: { name: 'John', email: 'john@example.com' },
  })
  body: Record<string, any> | string;

  @ApiPropertyOptional({
    description: 'Headers for the request',
    example: { Authorization: 'Bearer token' },
  })
  @IsOptional()
  headers?: HttpHeaders;

  @ApiPropertyOptional({
    description: 'Query parameters for the request',
    example: { version: 'v1' },
  })
  @IsOptional()
  params?: HttpParams;
}
