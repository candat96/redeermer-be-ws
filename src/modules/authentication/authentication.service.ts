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
import { JwtStrategyHelper } from '@modules/authentication/helpers/jwt-strategy.helper';
import {
  comparePassword,
  hashPassword,
} from '@modules/authentication/helpers/password.helper';
import { UserEntity } from '@modules/database/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private readonly jwtStrategyHelper: JwtStrategyHelper,
    private readonly userService: UserService,
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
        role: UserRole.CUSTOMER,
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
}
