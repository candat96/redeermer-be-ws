import { UserGender } from '@common/constants/enum/user.enum';
import { IsDateStringAllFormat } from '@common/decorators/is-date-string-all-format.decorator';
import { LoginResponseDto } from '@modules/authentication/dto/login.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Date, required: false })
  @IsDateStringAllFormat()
  @IsOptional()
  birthday: Date;

  @ApiProperty({ type: UserGender, enum: UserGender, required: false })
  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  background: string;

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

export class RegisterResponseDto extends LoginResponseDto {}
