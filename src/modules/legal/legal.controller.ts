import { ApiResponseDto } from '@common/classes/response.dto';
import { UserRole } from '@common/constants/enum/user.enum';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import { getErrorMessage } from '@common/utils/error-logger.util';
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
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { ReviewProjectFeedbackDto } from './dto/legal-review-multiple-field.dto';
import { LegalService } from './legal.service';

@BasicHeader('Legal')
@Controller('legal')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Roles([UserRole.ADMIN, UserRole.LEGAL])
@UsePipes(new ValidationPipe({ transform: true }))
export class LegalController {
  private readonly logger = new Logger(LegalController.name);

  constructor(private readonly legalService: LegalService) {}

  @Patch('review-feedback')
  @ApiOperation({
    summary: 'Review project feedback',
    description: 'Review project feedback',
  })
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async reviewMultipleFields(
    @Body() dto: ReviewProjectFeedbackDto,
    @AuthUser('id') reviewerId: string,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.legalService.reviewProjectFeedback(dto, reviewerId),
        message: ApiMessageKey.CREATE_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('REVIEW_PROJECT_FEEDBACK_FAILED'), err);
      throw err;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Find all projects for legal review',
    description: 'Find all projects for legal review',
  })
  @ApiOkResponse({ type: ApiResponseDto<FindAllProjectResponseDto> })
  async findAllProject(
    @Query() query: FindAllProjectDto,
  ): Promise<ApiResponseDto<FindAllProjectResponseDto>> {
    try {
      const { data, pagination } = await this.legalService.findAllProject(query);
      return new ApiResponseDto<FindAllProjectResponseDto>({
        statusCode: HttpStatus.OK,
        data: data,
        message: ApiMessageKey.GET_ALL_PROJECT_LEGAL_PERSON,
        pagination: pagination,
      });
    } catch (err) {
      this.logger.error(
        getErrorMessage('FIND_ALL_PROJECTS_LEGAL_REVIEW_FAILED'),
        err,
      );
      throw err;
    }
  }
}
