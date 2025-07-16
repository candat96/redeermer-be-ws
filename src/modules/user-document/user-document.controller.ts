import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { CreateUserDocumentDto } from '@modules/user-document/dto/create-user-document.dto';
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
  constructor(private readonly userDocumentService: UserDocumentService) {}

  @Post('documents')
  @ApiOperation({
    summary: 'Post user document to kyc',
    description: 'Post user document to kyc',
  })
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async upload(@AuthUser('id') userId: string, @Body() dto: CreateUserDocumentDto) {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.userDocumentService.uploadDocument(userId, dto),
        message: ApiMessageKey.UPLOAD_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get('documents')
  @ApiOperation({
    summary: 'Get user document',
    description: 'Get user document',
  })
  @ApiOkResponse({ type: ApiResponseDto<GetUserDocumentResponseDto> })
  async getMine(@AuthUser('id') userId: string) {
    try {
      return new ApiResponseDto<GetUserDocumentResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.userDocumentService.getMyDocuments(userId),
        message: ApiMessageKey.GET_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
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
  ) {
    return this.userDocumentService.verifyDocument(id, dto, id);
  }
}
