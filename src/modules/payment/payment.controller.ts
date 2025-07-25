import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import {
  PaymentWebhookPayload,
  PaymentWebhookResponse,
} from '@common/interfaces/payment.interface';
import { getErrorMessage } from '@common/utils/error-logger.util';
import { CheckoutDto } from '@modules/payment/dto/checkout.dto';
import { PaymentService } from '@modules/payment/payment.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@BasicHeader('Payment')
@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  @ApiOperation({
    summary: 'Create checkout link',
    description: 'Create checkout link',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<string> })
  async checkout(@Body() body: CheckoutDto): Promise<ApiResponseDto<string>> {
    try {
      return new ApiResponseDto<string>({
        statusCode: HttpStatus.OK,
        data: await this.paymentService.checkout(body),
        message: ApiMessageKey.CREATE_CHECKOUT_LINK_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('CHECKOUT_FAILED'), err);
      throw err;
    }
  }

  @Post('checkout/webhook')
  @ApiOperation({
    summary: 'Checkout webhook',
    description: 'Checkout webhook',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<PaymentWebhookResponse> })
  async checkoutWebhook(
    @Body() body: PaymentWebhookPayload,
  ): Promise<ApiResponseDto<PaymentWebhookResponse>> {
    try {
      return new ApiResponseDto<PaymentWebhookResponse>({
        statusCode: HttpStatus.OK,
        data: await this.paymentService.webhook(body),
        message: ApiMessageKey.RECEIVE_CHECKOUT_WEBHOOKS_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('WEBHOOK_PROCESSING_FAILED'), err);
      throw err;
    }
  }
}
