import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import {
  FindAllProjectDto,
  FindAllProjectResponseDto,
} from '@modules/project/dto/find-all-project.dto';
import { FindOneProjectResponseDto } from '@modules/project/dto/find-one-project.dto';
import { UpdateProjectDto } from '@modules/project/dto/update-project.dto';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@BasicHeader('Product')
@Controller('project')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body() dto: CreateProjectDto,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.createProject(dto, userId),
        message: ApiMessageKey.CREATE_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get('investor')
  async findAllInvestment(
    @Query() query: FindAllProjectDto,
    @AuthUser('id') userId: string,
  ) {
    const { data, pagination } = await this.projectService.findAllInvestment(
      query,
      userId,
    );
    return new ApiResponseDto<FindAllProjectResponseDto>({
      statusCode: HttpStatus.OK,
      data: data,
      message: ApiMessageKey.GET_ALL_PROJECT_INVESTMENT,
      pagination: pagination,
    });
  }

  @Get('legal')
  async findAllProject(@Query() query: FindAllProjectDto) {
    try {
      const { data, pagination } = await this.projectService.findAllProject(query);
      return new ApiResponseDto<FindAllProjectResponseDto>({
        statusCode: HttpStatus.OK,
        data: data,
        message: ApiMessageKey.GET_ALL_PROJECT_LEGAL_PERSON,
        pagination: pagination,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Patch(':id')
  async updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.updateProject(id, body),
        message: ApiMessageKey.GET_DETAIL_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get(':id')
  async getProjectDetail(@Param('id') id: string) {
    try {
      return new ApiResponseDto<FindOneProjectResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.findOne(id),
        message: ApiMessageKey.GET_DETAIL_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
