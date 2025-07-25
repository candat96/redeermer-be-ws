import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class GetAccessTokenResponseDto {
  @ApiProperty({
    type: String,
    description: 'PayPal access token scope',
  })
  @IsString()
  @IsNotEmpty()
  scope: string;

  @ApiProperty({
    type: String,
    description: 'PayPal access token',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty({
    type: String,
    description: 'Token type',
  })
  @IsString()
  @IsNotEmpty()
  token_type: string;

  @ApiProperty({
    type: String,
    description: 'PayPal application ID',
  })
  @IsString()
  @IsNotEmpty()
  app_id: string;

  @ApiProperty({
    type: Number,
    description: 'Token expiration time in seconds',
  })
  @IsNumber()
  @IsNotEmpty()
  expires_in: number;

  @ApiProperty({
    type: String,
    description: 'Nonce value for security',
  })
  @IsString()
  @IsNotEmpty()
  nonce: string;
}
