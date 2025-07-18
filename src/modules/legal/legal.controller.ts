import { ApiResponseDto } from '@common/classes/response.dto';
import { UserRole } from '@common/constants/enum/user.enum';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import {
  FindAllProjectDto,
  FindAllProjectResponseDto,
} from '@modules/project/dto/find-all-project.dto';
import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
  UseGuards,
  Get,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReviewProjectFeedbackDto } from './dto/legal-review-multiple-field.dto';
import { LegalService } from './legal.service';

@BasicHeader('Legal')
@Controller('legal')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Roles([UserRole.ADMIN, UserRole.LEGAL])
@UsePipes(new ValidationPipe({ transform: true }))
export class LegalController {
  constructor(private readonly legalService: LegalService) {}

  @Patch('review-feedback')
  async reviewMultipleFields(
    @Body() dto: ReviewProjectFeedbackDto,
    @AuthUser('id') reviewerId: string,
  ) {
    await this.legalService.reviewProjectFeedback(dto, reviewerId);
  }

  @Get('legal')
  async findAllProject(@Query() query: FindAllProjectDto) {
    try {
      const { data, pagination } = await this.legalService.findAllProject(query);
      return new ApiResponseDto<FindAllProjectResponseDto>({
        statusCode: HttpStatus.OK,
        data: data,
        message: ApiMessageKey.GET_ALL_PROJECT_LEGAL_PERSON,
        pagination: pagination,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
