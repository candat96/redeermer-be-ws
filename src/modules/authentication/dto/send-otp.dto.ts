import { SendOtpScope } from '@common/constants/enum/email.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Email address to send OTP to',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: SendOtpScope,
    enum: SendOtpScope,
    required: true,
    description: 'Purpose of OTP (register, reset password, etc.)',
  })
  @IsEnum(SendOtpScope)
  @IsNotEmpty()
  scope: SendOtpScope;
}
