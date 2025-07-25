import { LoginResponseDto } from '@modules/authentication/dto/login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'JWT refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class RefreshTokenResponseDto extends LoginResponseDto {}
