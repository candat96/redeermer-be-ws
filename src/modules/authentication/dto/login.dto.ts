import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User email address',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Device identifier',
  })
  @IsString()
  @IsOptional()
  deviceId: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Device type (mobile, web, etc.)',
  })
  @IsString()
  @IsOptional()
  deviceType: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Device name',
  })
  @IsString()
  @IsOptional()
  deviceName: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Firebase Cloud Messaging token',
  })
  @IsString()
  @IsOptional()
  fcmToken: string;
}

export class GenerateTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'JWT access token',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'JWT refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(props: GenerateTokenDto) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}

export class LoginResponseDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'JWT access token',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'JWT refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  constructor(props: GenerateTokenDto) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
