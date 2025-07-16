import { ErrorCode } from '@common/constants/error.constant';
import { PaypalEndpoints } from '@common/constants/payment.constant';
import { HttpHelperService } from '@modules/http-helper/http-helper.service';
import {
  CreateOrderDto,
  CreateOrderResponseDto,
} from '@modules/payment/paypal/dto/create-order.dto';
import { GetAccessTokenResponseDto } from '@modules/payment/paypal/dto/get-access-token.dto';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import qs from 'qs';

@Injectable()
export class PaypalService {
  constructor(private readonly httpService: HttpHelperService) {}

  private readonly logger = new Logger(PaypalService.name);

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    ).toString('base64');
    const url = process.env.PAYPAL_BASE_URL + PaypalEndpoints.getAccessToken;
    const body = qs.stringify({ grant_type: 'client_credentials' });
    const headers = {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response: GetAccessTokenResponseDto = await this.httpService.commonPost({
        url,
        body,
        headers,
        params: null,
      });
      return response.access_token;
    } catch (error) {
      console.log(error);
      this.logger.error(error);
      throw new InternalServerErrorException(
        ErrorCode.GET_PAYPAL_ACCESS_TOKEN_FAILED,
      );
    }
  }

  async createOrder(dto: CreateOrderDto): Promise<string> {
    const accessToken = await this.getAccessToken();
    const url = process.env.PAYPAL_BASE_URL + PaypalEndpoints.createCheckoutOrder;
    const body = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: dto.currencyCode,
            value: dto.amount,
          },
        },
      ],
    };
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };

    try {
      const result: CreateOrderResponseDto = await this.httpService.commonPost({
        url,
        body,
        headers,
        params: null,
      });
      const approve = result.links.find((item) => item.rel === 'approve');
      if (!approve) {
        throw new InternalServerErrorException(
          ErrorCode.CREATE_PAYPAL_CHECKOUT_ORDER_FAILED,
        );
      }

      return approve.href;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ErrorCode.CREATE_PAYPAL_CHECKOUT_ORDER_FAILED,
      );
    }
  }
}
