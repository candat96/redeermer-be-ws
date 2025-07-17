import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class VerifyUserDocumentDto {
  @ApiProperty({ enum: UserDocumentVerifyStatusEnum })
  @IsEnum(UserDocumentVerifyStatusEnum)
  status: UserDocumentVerifyStatusEnum;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
