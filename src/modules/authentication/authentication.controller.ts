import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { AuthenticationService } from '@modules/authentication/authentication.service';
import { LoginDto, LoginResponseDto } from '@modules/authentication/dto/login.dto';
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
} from '@modules/authentication/dto/refresh-token.dto';
import {
  RegisterDto,
  RegisterResponseDto,
} from '@modules/authentication/dto/register.dto';
import { SendOtpDto } from '@modules/authentication/dto/send-otp.dto';
import { VerifyOtpDto } from '@modules/authentication/dto/verify-otp.dto';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@BasicHeader('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<LoginResponseDto> })
  async login(@Body() body: LoginDto): Promise<ApiResponseDto<LoginResponseDto>> {
    try {
      return new ApiResponseDto<LoginResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.authService.login(body),
        message: ApiMessageKey.LOGIN_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register',
    description: 'Register',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<RegisterResponseDto> })
  async register(
    @Body() body: RegisterDto,
  ): Promise<ApiResponseDto<RegisterResponseDto>> {
    try {
      return new ApiResponseDto<RegisterResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.authService.register(body),
        message: ApiMessageKey.REGISTER_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('token/refresh')
  @ApiOperation({
    summary: 'Refresh token',
    description: 'Refresh token',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<RefreshTokenResponseDto> })
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<ApiResponseDto<RefreshTokenResponseDto>> {
    try {
      return new ApiResponseDto<RefreshTokenResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.authService.refreshToken(body),
        message: ApiMessageKey.REFRESH_TOKEN_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('otp/send')
  @ApiOperation({
    summary: 'Send OTP',
    description: 'Send OTP',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async sendOtp(@Body() body: SendOtpDto): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.authService.sendOtp(body),
        message: ApiMessageKey.SEND_OTP_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Post('otp/verify')
  @ApiOperation({
    summary: 'Verify OTP',
    description: 'Verify OTP',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async verifyOtp(@Body() body: VerifyOtpDto): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.authService.verifyOtp(body),
        message: ApiMessageKey.VERIFY_OTP_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
