import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SendOtpEmailDto {
  @ApiProperty({
    type: String,
    example: '123456',
    description: 'OTP code to send',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    type: String,
    example: 'user@example.com',
    description: 'Email address to send OTP to',
  })
  @IsString()
  @IsNotEmpty()
  receiver: string;
}
