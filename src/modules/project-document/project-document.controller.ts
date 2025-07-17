import { ApiResponseDto } from '@common/classes/response.dto';
import { ApiMessageKey } from '@common/constants/message.constant';
import { AuthGuard } from '@common/guards/auth.guard';
import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProjectDocumentService } from './project-document.service';

@ApiTags('Project-document')
@Controller('project-document')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@UsePipes(new ValidationPipe({ transform: true }))
export class ProjectDocumentController {
  constructor(private readonly projectDocumentService: ProjectDocumentService) {}

  @Get()
  @ApiOperation({
    summary: 'Get project document',
    description: 'Get project document',
  })
  async getProjectDocument(@Query() query: any) {
    try {
      return new ApiResponseDto({
        statusCode: HttpStatus.OK,
        data: await this.projectDocumentService.getProjectDocument(query),
        message: ApiMessageKey.GET_DOCUMENT_SUCCESS,
        pagination: null,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
