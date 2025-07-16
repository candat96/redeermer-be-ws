import { RangeDateRequestDto } from '@common/classes/request.dto';
import { UserDocumentVerifyStatusEnum } from '@common/constants/enum/user-document.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class GetUserDocumentListDto extends RangeDateRequestDto {
  @ApiPropertyOptional({ enum: UserDocumentVerifyStatusEnum, required: false })
  @IsOptional()
  @IsEnum(UserDocumentVerifyStatusEnum)
  status?: UserDocumentVerifyStatusEnum;
}
