import { SendOtpScope } from '@common/constants/enum/email.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email address associated with the OTP',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    minLength: 6,
    maxLength: 6,
    required: true,
    description: '6-digit OTP code',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  otp: string;

  @ApiProperty({
    type: SendOtpScope,
    enum: SendOtpScope,
    required: true,
    description: 'Purpose of OTP verification',
  })
  @IsEnum(SendOtpScope)
  @IsNotEmpty()
  scope: SendOtpScope;
}
