import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  deviceId: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  deviceType: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  deviceName: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  fcmToken: string;
}

export class GenerateTokenDto {
  accessToken: string;
  refreshToken: string;

  constructor(props: GenerateTokenDto) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;

  constructor(props: GenerateTokenDto) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
