import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { getErrorMessage } from '@common/utils/error-logger.util';
import { CreateUserDocumentDto } from '@modules/user-document/dto/create-user-document.dto';
import { GetUserDocumentListDto } from '@modules/user-document/dto/get-list-user-document.dto';
import { GetUserDocumentResponseDto } from '@modules/user-document/dto/get-user-document.dto.';
import { VerifyUserDocumentDto } from '@modules/user-document/dto/verify-user-document.dto';
import { UserDocumentService } from '@modules/user-document/user-document.service';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User-document')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('user-document')
export class UserDocumentController {
  private readonly logger = new Logger(UserDocumentController.name);

  constructor(private readonly userDocumentService: UserDocumentService) {}

  @Post('documents')
  @ApiOperation({
    summary: 'Post user document to kyc',
    description: 'Post user document to kyc',
  })
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async upload(
    @AuthUser('id') userId: string,
    @Body() dto: CreateUserDocumentDto,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.userDocumentService.uploadDocument(userId, dto),
        message: ApiMessageKey.UPLOAD_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('UPLOAD_USER_DOCUMENT_FAILED'), err);
      throw err;
    }
  }

  @Get('documents')
  @ApiOperation({
    summary: 'Get user document',
    description: 'Get user document',
  })
  @ApiOkResponse({ type: ApiResponseDto<GetUserDocumentResponseDto> })
  async getMine(
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<GetUserDocumentResponseDto>> {
    try {
      return new ApiResponseDto<GetUserDocumentResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.userDocumentService.getMyDocuments(userId),
        message: ApiMessageKey.GET_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('GET_USER_DOCUMENTS_FAILED'), err);
      throw err;
    }
  }

  @Patch('documents/verify/:id')
  @ApiOperation({
    summary: 'Verify user document',
    description: 'Verify user document',
  })
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async verify(
    @Param('id') id: string,
    @AuthUser('id') userId: string,
    @Body() dto: VerifyUserDocumentDto,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.userDocumentService.verifyDocument(id, dto, userId),
        message: ApiMessageKey.VERIFY_USER_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('VERIFY_USER_DOCUMENT_FAILED', { id }), err);
      throw err;
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get list user documents',
    description: 'Get list user documents',
  })
  @ApiOkResponse({ type: ApiResponseDto<GetUserDocumentResponseDto> })
  async getListUserDocument(
    @Query() query: GetUserDocumentListDto,
  ): Promise<ApiResponseDto<GetUserDocumentResponseDto>> {
    try {
      return new ApiResponseDto<GetUserDocumentResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.userDocumentService.getList(query),
        message: ApiMessageKey.GET_LIST_USER_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('GET_LIST_USER_DOCUMENTS_FAILED'), err);
      throw err;
    }
  }
}
