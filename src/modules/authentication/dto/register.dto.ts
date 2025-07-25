import { UserGender } from '@common/constants/enum/user.enum';
import { IsDateStringAllFormat } from '@common/decorators/is-date-string-all-format.decorator';
import { LoginResponseDto } from '@modules/authentication/dto/login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'User email address',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'User full name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'User birthday',
  })
  @IsDateStringAllFormat()
  @IsOptional()
  birthday: Date;

  @ApiProperty({
    type: UserGender,
    enum: UserGender,
    required: false,
    description: 'User gender',
  })
  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;

  @ApiProperty({
    type: String,
    required: false,
    description: 'User avatar URL',
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'User background image URL',
  })
  @IsString()
  @IsOptional()
  background: string;

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

export class RegisterResponseDto extends LoginResponseDto {}
