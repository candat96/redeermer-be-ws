import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import { FindAllProjectDto } from '@modules/project/dto/find-all-project.dto';
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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @Body() dto: CreateProjectDto,
  ): Promise<ApiResponseDto<boolean>> {
    try {
      return new ApiResponseDto<boolean>({
        statusCode: HttpStatus.OK,
        data: await this.projectService.createProject(dto),
        message: ApiMessageKey.CREATE_PROJECT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get('investment')
  async findAllInvestment(@Query() query: FindAllProjectDto) {
    const { data, pagination } = await this.projectService.findAllInvestment(query);
    return new ApiResponseDto<boolean>({
      statusCode: HttpStatus.OK,
      data: data,
      message: ApiMessageKey.GET_ALL_PROJECT_INVESTMENT,
      pagination: pagination,
    });
  }

  @Get()
  async findAllMyProject(@Query() query: FindAllProjectDto) {
    const { data, pagination } = await this.projectService.findAllMyProject(query);
    return new ApiResponseDto<boolean>({
      statusCode: HttpStatus.OK,
      data: data,
      message: ApiMessageKey.GET_ALL_PROJECT_LEGAL_PERSON,
      pagination: pagination,
    });
  }

  @Patch(':id')
  async updateProject(@Param() id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.updateProject(id, body);
  }
}
