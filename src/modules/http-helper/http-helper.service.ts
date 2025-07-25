import { HttpError } from '@common/interfaces/http.interface';
import { getErrorMessage } from '@common/utils/error-logger.util';
import { CommonGetDto } from '@modules/http-helper/dto/common-get.dto';
import { CommonPostDto } from '@modules/http-helper/dto/common-post.dto';
import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class HttpHelperService {
  private readonly logger = new Logger(HttpHelperService.name);

  async commonGet<T = any>(dto: CommonGetDto): Promise<T> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse<T> = await axios.get(dto.url, {
        headers: dto.headers || defaultHeaders,
        params: dto.params,
      });

      return response.data;
    } catch (err) {
      const error = err as HttpError;
      this.logger.error(
        getErrorMessage('HTTP_GET_REQUEST_FAILED', { message: error.message }),
        error.response?.data,
      );
      throw err;
    }
  }

  async commonPost<T = any>(dto: CommonPostDto): Promise<T> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response: AxiosResponse<T> = await axios.post(dto.url, dto.body, {
        headers: dto.headers || defaultHeaders,
        params: dto.params,
      });

      return response.data;
    } catch (err) {
      const error = err as HttpError;
      this.logger.error(
        getErrorMessage('HTTP_POST_REQUEST_FAILED', { message: error.message }),
        error.response?.data,
      );
      throw err;
    }
  }
}
