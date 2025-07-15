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
  @ApiProperty({ type: String, example: 'abc@gmail.com', required: true })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    minLength: 6,
    maxLength: 6,
    example: '1234',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  otp: string;

  @ApiProperty({
    type: SendOtpScope,
    enum: SendOtpScope,
    required: true,
  })
  @IsEnum(SendOtpScope)
  @IsNotEmpty()
  scope: SendOtpScope;
}
