import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddWhitelistEmailDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  email: string;
}
