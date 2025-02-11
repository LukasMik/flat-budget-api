import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service.v2';
import { CreateProjectDto } from './dto/create-project.dto.v2';
import {
  apiDecoratorsCreate,
  apiDecoratorsDelete,
  apiDecoratorsFindAll,
  apiDecoratorsFindOne,
} from 'src/common/api-decorator';

const entityName = 'Project';
@ApiTags('Projects')
@Controller({
  version: '2',
  path: 'projects',
})
export class ProjectsControllerV2 {
  constructor(private readonly projectsService: ProjectsService) {}

  @apiDecoratorsFindAll(entityName)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @apiDecoratorsFindOne(entityName)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @apiDecoratorsCreate(entityName)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @apiDecoratorsDelete(entityName)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
