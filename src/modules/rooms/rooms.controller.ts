import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  apiDecoratorsCreate,
  apiDecoratorsDelete,
  apiDecoratorsFindAll,
  apiDecoratorsFindByProjectId,
  apiDecoratorsFindOne,
} from 'src/common/api-decorator';
import { Project } from '../projects/schemas/project.schema';

const entityName = 'Room';

@ApiTags('Rooms')
@Controller({
  version: '1',
  path: 'rooms',
})
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  @apiDecoratorsFindAll(entityName)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @apiDecoratorsFindOne(entityName)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @apiDecoratorsCreate(entityName)
  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    const project = await this.projectModel.findById(createRoomDto?.projectId);
    if (!project) {
      throw new NotFoundException(
        `Project with id ${createRoomDto?.projectId} not found`,
      );
    }
    return this.roomsService.create(createRoomDto);
  }

  @apiDecoratorsFindByProjectId(entityName)
  @Get('project/:id')
  findByProjectId(@Param('id') id: string) {
    return this.roomsService.findByProjectId(id);
  }

  @apiDecoratorsDelete(entityName)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }
}
