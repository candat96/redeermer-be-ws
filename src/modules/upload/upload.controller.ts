import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { getErrorMessage } from '@common/utils/error-logger.util';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@BasicHeader('Upload')
@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @ApiOperation({
    summary: 'Upload files',
    description: 'Upload multiple files to S3 storage',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Upload multiple files of any type.',
        },
      },
    },
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<string[]> })
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ApiResponseDto<string[]>> {
    try {
      const urls = await this.uploadService.uploadFiles(files);
      return new ApiResponseDto<string[]>({
        statusCode: HttpStatus.OK,
        data: urls,
        message: ApiMessageKey.UPLOAD_FILES_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('FILE_UPLOAD_FAILED'), err);
      throw err;
    }
  }
}
