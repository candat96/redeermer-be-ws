import { RangeDateRequestDto } from '@common/classes/request.dto';
import {
  ProjectSaleStatusEnum,
  ProjectType,
  ProjectVerifiedStatus,
} from '@common/constants/enum/project.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class FindAllProjectDto extends RangeDateRequestDto {
  @ApiProperty({
    enum: ProjectType,
    example: ProjectType.URBAN,
    description: 'Type of the project (e.g., Residential, Commercial, etc.)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectType)
  propertyType: ProjectType;

  @ApiProperty({
    enum: ProjectVerifiedStatus,
    example: ProjectVerifiedStatus.PENDING,
    description:
      'Verification status of the project (e.g., PENDING, APPROVED, REJECTED)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectVerifiedStatus)
  projectVerifiedStatus: ProjectVerifiedStatus;

  @ApiProperty({
    enum: ProjectSaleStatusEnum,
    example: ProjectSaleStatusEnum.ON_SALE,
    description:
      'Sale status of the project (e.g., ON_SALE, SOLD, PENDING, CANCELLED)',
    required: false,
  })
  @IsOptional()
  @IsEnum(ProjectSaleStatusEnum)
  saleStatus: ProjectSaleStatusEnum;
}
