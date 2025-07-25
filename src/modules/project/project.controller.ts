import { ApiResponseDto } from '@common/classes/response.dto';
import { UserRole } from '@common/constants/enum/user.enum';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthUser } from '@common/decorators/auth-user.decorator';
import { BasicHeader } from '@common/decorators/basic-header.decorator';
import { Roles } from '@common/decorators/roles.decorator';
import { AuthGuard } from '@common/guards/auth.guard';
import { RoleGuard } from '@common/guards/role.guard';
import { getErrorMessage } from '@common/utils/error-logger.util';
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
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@BasicHeader('Project')
@Controller('project')
@ApiBearerAuth()
@UseGuards(AuthGuard, RoleGuard)
@Roles([UserRole.ADMIN, UserRole.USER])
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Create project',
    description: 'Create project',
  })
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
      this.logger.error(getErrorMessage('CREATE_PROJECT_FAILED'), err);
      throw err;
    }
  }

  @Get('investor')
  @ApiOperation({
    summary: 'Get all investor project',
    description: 'Get all investor project',
  })
  async findAllInvestment(
    @Query() query: FindAllProjectDto,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<FindAllProjectResponseDto>> {
    try {
      const { data, pagination } = await this.projectService.findAllInvestment(
        query,
        userId,
      );
      return new ApiResponseDto<FindAllProjectResponseDto>({
        statusCode: HttpStatus.OK,
        data,
        message: ApiMessageKey.GET_ALL_PROJECT_INVESTMENT,
        pagination: pagination,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('GET_INVESTOR_PROJECTS_FAILED'), err);
      throw err;
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update project info',
    description: 'Update project info',
  })
  async updateProject(
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.updateProject(id, body, userId),
        message: ApiMessageKey.UPDATE_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('UPDATE_PROJECT_FAILED', { id }), err);
      throw err;
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get project detail',
    description: 'Get project detail',
  })
  async getProjectDetail(
    @Param('id') id: string,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<FindOneProjectResponseDto>> {
    try {
      return new ApiResponseDto<FindOneProjectResponseDto>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.findOne(id, userId),
        message: ApiMessageKey.GET_DETAIL_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('GET_PROJECT_DETAIL_FAILED', { id }), err);
      throw err;
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete project',
    description: 'Delete project',
  })
  async deleteProject(
    @Param('id') id: string,
    @AuthUser('id') userId: string,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.delete(id, userId),
        message: ApiMessageKey.DELETE_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      this.logger.error(getErrorMessage('DELETE_PROJECT_FAILED', { id }), err);
      throw err;
    }
  }
}
