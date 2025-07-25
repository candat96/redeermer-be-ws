import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateUserDocumentDto {
  @ApiProperty({
    type: String,
    example: 'National ID',
    description: 'Document name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: [String],
    description: 'Array of document URLs',
  })
  @IsArray()
  urls: string[];
}
