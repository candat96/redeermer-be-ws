import { ApiResponseDto } from '@common/classes/response.dto';
import { UserRole } from '@common/constants/enum/user.enum';
import { ApiMessageKey } from '@common/constants/message.constant';
import { Auth } from '@common/decorators/auth.decorator';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { AccessTokenDataDto, AuthGuard } from '@common/guards/auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import {
  FindAllUserDto,
  FindAllUserResponseDto,
} from '@modules/user/dto/find-all-user.dto';
import { FindUserByIdResponseDto } from '@modules/user/dto/find-user-by-id.dto';
import { UpdateMeDto } from '@modules/user/dto/update-me.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { UserService } from '@modules/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@BasicHeader('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Find all users',
    description: 'Find all users',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<FindAllUserResponseDto[]> })
  async findAll(
    @Query() query: FindAllUserDto,
  ): Promise<ApiResponseDto<FindAllUserResponseDto[]>> {
    try {
      const { data, pagination } = await this.userService.findAll(query);

      return new ApiResponseDto<FindAllUserResponseDto[]>({
        statusCode: HttpStatus.OK,
        data,
        message: ApiMessageKey.FIND_ALL_USER_SUCCESS,
        pagination,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get('me')
  @ApiOperation({
    summary: 'Get personal information',
    description: 'Get personal information',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<FindUserByIdResponseDto> })
  async getMe(
    @Auth() auth: AccessTokenDataDto,
  ): Promise<ApiResponseDto<FindUserByIdResponseDto>> {
    try {
      return new ApiResponseDto<FindUserByIdResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.userService.findMe(auth.id),
        message: ApiMessageKey.GET_USER_DETAIL_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find user by id',
    description: 'Find user by id',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<FindUserByIdResponseDto> })
  async findById(
    @Param('id') id: string,
  ): Promise<ApiResponseDto<FindUserByIdResponseDto>> {
    try {
      return new ApiResponseDto<FindUserByIdResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.userService.findOne(id),
        message: ApiMessageKey.GET_USER_DETAIL_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Patch('me')
  @ApiOperation({
    summary: 'Update personal information',
    description: 'Update personal information',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<FindUserByIdResponseDto> })
  async updateMe(
    @Auth() auth: AccessTokenDataDto,
    @Body() body: UpdateMeDto,
  ): Promise<ApiResponseDto<FindUserByIdResponseDto>> {
    try {
      return new ApiResponseDto<FindUserByIdResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.userService.updateMe(auth.id, body),
        message: ApiMessageKey.UPDATE_USER_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user',
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([UserRole.ADMIN])
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.userService.update(id, body),
        message: ApiMessageKey.UPDATE_USER_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user',
  })
  @UseGuards(AuthGuard, RoleGuard)
  @Roles([UserRole.ADMIN])
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: ApiResponseDto<boolean> })
  async delete(@Param('id') id: string): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.userService.delete(id),
        message: ApiMessageKey.DELETE_USER_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
