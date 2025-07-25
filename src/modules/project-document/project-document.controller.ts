import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { getErrorMessage } from '@common/utils/error-logger.util';
import {
  GetProjectDocumentDto,
  GetProjectDocumentResponse,
} from '@modules/project-document/dto/get-project-document.dto';
import { VerifyMultipleProjectDocumentsDto } from '@modules/project-document/dto/verify-multi-project-document.dto';
import { VerifyProjectDocumentDto } from '@modules/project-document/dto/verify-project-document.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ProjectDocumentService } from './project-document.service';

@ApiTags('Project-document')
@Controller('project-document')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectDocumentController {
  private readonly logger = new Logger(ProjectDocumentController.name);

  constructor(private readonly projectDocumentService: ProjectDocumentService) {}

  @Get()
  @ApiOperation({
    summary: 'Get project document',
    description: 'Get project document',
  })
  @ApiOkResponse({ type: ApiResponseDto<GetProjectDocumentResponse> })
  async getProjectDocument(
    @Query() query: GetProjectDocumentDto,
  ): Promise<ApiResponseDto<GetProjectDocumentResponse>> {
    try {
      const { data, pagination } =
        await this.projectDocumentService.getProjectDocument(query);

      return new ApiResponseDto<GetProjectDocumentResponse>({
        statusCode: HttpStatus.OK,
        data,
        message: ApiMessageKey.GET_DOCUMENT_SUCCESS,
        pagination: pagination,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('GET_PROJECT_DOCUMENT_FAILED'), err);
      throw err;
    }
  }

  @Patch('verify/:id')
  @ApiOperation({
    summary: 'Verify project document',
    description: 'Verify project document',
  })
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async verifiedProjectDocument(
    @Param('id') id: string,
    @Body() dto: VerifyProjectDocumentDto,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectDocumentService.verifiedProjectDocument(
          id,
          dto,
          userId,
        ),
        message: ApiMessageKey.VERIFIED_PROJECT_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(
        getErrorMessage('VERIFY_PROJECT_DOCUMENT_FAILED', { id }),
        err,
      );
      throw err;
    }
  }

  @Patch('verify-multiple')
  @ApiOperation({
    summary: 'Verify multiple project documents',
    description: 'Verify multiple project documents',
  })
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async verifyMultiple(
    @Body() dto: VerifyMultipleProjectDocumentsDto,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectDocumentService.verifyMultipleDocuments(dto, userId),
        message: ApiMessageKey.VERIFIED_MULTI_PROJECT_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(
        getErrorMessage('VERIFY_MULTIPLE_PROJECT_DOCUMENTS_FAILED'),
        err,
      );
      throw err;
    }
  }
}
