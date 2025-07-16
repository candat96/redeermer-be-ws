import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDocumentDto {
  @ApiProperty({ example: 'National ID' })
  @IsString()
  name: string;

  @ApiProperty()
  urls: string[];
}
