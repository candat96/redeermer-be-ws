import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { getErrorMessage } from '@common/utils/error-logger.util';
import { AddWhitelistEmailDto } from '@modules/whitelist-email/dto/add-whitelist-email.dto';
import { DeleteWhitelistEmailDto } from '@modules/whitelist-email/dto/delete-whitelist.dto';
import { WhitelistEmailService } from '@modules/whitelist-email/whitelist-email.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@BasicHeader('Whitelist Email')
@Controller('whitelist-email')
export class WhitelistEmailController {
  private readonly logger = new Logger(WhitelistEmailController.name);

  constructor(private readonly whitelistEmailService: WhitelistEmailService) {}

  @Post()
  @ApiOperation({
    summary: 'Add email into whitelist',
    description: 'Add email into whitelist',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async add(@Body() body: AddWhitelistEmailDto): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.whitelistEmailService.add(body),
        message: ApiMessageKey.ADD_EMAIL_INTO_WHITELIST_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('ADD_EMAIL_TO_WHITELIST_FAILED'), err);
      throw err;
    }
  }

  @Post('remove')
  @ApiOperation({
    summary: 'Remove email from whitelist',
    description: 'Remove email from whitelist',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async remove(
    @Body() body: DeleteWhitelistEmailDto,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.whitelistEmailService.delete(body),
        message: ApiMessageKey.REMOVE_EMAIL_FROM_WHITELIST_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('REMOVE_EMAIL_FROM_WHITELIST_FAILED'), err);
      throw err;
    }
  }
}
