import { CommonGetDto } from '@modules/http-helper/dto/common-get.dto';
import { CommonPostDto } from '@modules/http-helper/dto/common-post.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpHelperService {
  async commonGet(dto: CommonGetDto): Promise<any> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await axios.get(dto.url, {
        headers: dto.headers || defaultHeaders,
        params: dto.params,
      });

      return data;
    } catch (err) {
      console.log(err.response);
      throw err;
    }
  }

  async commonPost(dto: CommonPostDto): Promise<any> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const { data } = await axios.post(dto.url, dto.body, {
        headers: dto.headers || defaultHeaders,
        params: dto.params,
      });

      return data;
    } catch (err) {
      console.log(err.response);
      throw err;
    }
  }
}
