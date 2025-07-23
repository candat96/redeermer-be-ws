import { AppConstants } from '@common/constants/app.constant';
import { SendOtpScope } from '@common/constants/enum/email.enum';
import { UserRole, UserStatus } from '@common/constants/enum/user.enum';
import { ErrorCode } from '@common/constants/error.constant';
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
import { JwtStrategyHelper } from '@modules/authentication/helpers/jwt-strategy.helper';
import {
  comparePassword,
  hashPassword,
} from '@modules/authentication/helpers/password.helper';
import { UserEntity } from '@modules/database/entities/user.entity';
import { EmailService } from '@modules/email/email.service';
import { UserService } from '@modules/user/user.service';
import { WhitelistEmailService } from '@modules/whitelist-email/whitelist-email.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private readonly emailService: EmailService,
    private readonly jwtStrategyHelper: JwtStrategyHelper,
    private readonly userService: UserService,
    private readonly whitelistEmailService: WhitelistEmailService,
  ) {}

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
    }

    const compare: boolean = await comparePassword(dto.password, user.password);
    if (!compare) {
      throw new BadRequestException(ErrorCode.INVALID_PASSWORD);
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException(ErrorCode.INACTIVE_USER);
    }

    const token = this.jwtStrategyHelper.generateToken(user);
    return new LoginResponseDto(token);
  }

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    const existedUser = await this.userService.findByEmail(dto.email);
    if (existedUser) {
      throw new BadRequestException(ErrorCode.EMAIL_HAS_BEEN_USED);
    }

    const hashed = await hashPassword(dto.password);

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        email: dto.email,
        password: hashed,
        name: dto.name,
        birthday: dto.birthday,
        avatar: dto.avatar,
        background: dto.background,
        gender: dto.gender,
        role: UserRole.USER,
        status: UserStatus.ACTIVE,
      }),
    );

    const token = this.jwtStrategyHelper.generateToken(newUser);
    return new RegisterResponseDto(token);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    const tokenData = await this.jwtStrategyHelper.verifyRefreshToken(
      dto.refreshToken,
    );

    const user = await this.userRepository.findOneBy({ id: tokenData.id });
    if (!user) {
      throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
    }

    const tokens = this.jwtStrategyHelper.generateToken(user);
    return new RefreshTokenResponseDto(tokens);
  }

  private generateOtp(): string {
    return Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
  }

  async sendOtp(dto: SendOtpDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (dto.scope === SendOtpScope.FORGOT_PASSWORD && !user) {
      throw new BadRequestException(ErrorCode.USER_NOT_FOUND);
    }

    if (dto.scope === SendOtpScope.REGISTER && user) {
      throw new BadRequestException(ErrorCode.EMAIL_HAS_BEEN_USED);
    }

    const otp = this.generateOtp();
    const cacheKey = `${dto.email}_${dto.scope}`;
    const cached = await this.cacheManager.get(dto.email);

    if (cached) {
      await this.cacheManager.del(cacheKey);
    }

    await this.cacheManager.set(cacheKey, otp, AppConstants.OTP_CACHE_TTL);

    await this.emailService.sendOtp({
      receiver: dto.email,
      otp,
    });

    return true;
  }

  async verifyOtp(dto: VerifyOtpDto): Promise<boolean> {
    const verifyWhitelist = await this.whitelistEmailService.checkWhitelistEmail(
      dto.email,
    );
    if (verifyWhitelist && dto.otp === AppConstants.DEFAULT_OTP) {
      return true;
    }

    const cacheKey = `${dto.email}_${dto.scope}`;
    const otp = await this.cacheManager.get(cacheKey);

    if (dto.otp !== otp) {
      throw new BadRequestException(ErrorCode.INVALID_OTP);
    }

    await this.cacheManager.del(cacheKey);

    return true;
  }
}
