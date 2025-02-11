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
import { UsedMaterialsService } from './used-materials.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  apiDecoratorsCreate,
  apiDecoratorsDelete,
  apiDecoratorsFindAll,
  apiDecoratorsFindByMaterialId,
  apiDecoratorsFindByProjectId,
  apiDecoratorsFindByRoomId,
  apiDecoratorsFindOne,
  apiDecoratorsGetPrice,
  apiDecoratorsGetTotalPriceByProject,
  apiDecoratorsGetTotalPriceByRoom,
} from 'src/common/api-decorator';
import { Room } from '../rooms/schemas/room.schema';
import { Material } from '../materials/schemas/material.schema';
import { CreateUsedMaterialDto } from './dto/create-used-material.dto';

const entityName = 'UsedMaterial';

@ApiTags('UsedMaterials')
@Controller({
  version: '1',
  path: 'used-materials',
})
export class UsedMaterialsController {
  constructor(
    private readonly usedMaterialsService: UsedMaterialsService,
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  @apiDecoratorsFindAll(entityName)
  @Get()
  findAll() {
    return this.usedMaterialsService.findAll();
  }

  @apiDecoratorsFindOne(entityName)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usedMaterialsService.findOne(id);
  }

  @apiDecoratorsCreate(entityName)
  @Post()
  async create(@Body() createUsedMaterialDto: CreateUsedMaterialDto) {
    const material = await this.materialModel.findById(
      createUsedMaterialDto?.materialId,
    );
    if (!material) {
      throw new NotFoundException(
        `Material with id ${createUsedMaterialDto?.materialId} not found`,
      );
    }
    const room = await this.roomModel.findById(createUsedMaterialDto?.roomId);
    if (!room) {
      throw new NotFoundException(
        `Room with id ${createUsedMaterialDto?.roomId} not found`,
      );
    }
    return this.usedMaterialsService.create(createUsedMaterialDto);
  }

  @apiDecoratorsFindByRoomId(entityName)
  @Get('room/:id')
  findByRoomId(@Param('id') id: string) {
    return this.usedMaterialsService.findByRoomId(id);
  }

  @apiDecoratorsFindByProjectId(entityName)
  @Get('project/:id')
  findByProjectId(@Param('id') id: string) {
    return this.usedMaterialsService.findByProjectId(id);
  }

  @apiDecoratorsGetPrice(entityName)
  @Get('price/:id')
  getPrice(@Param('id') id: string) {
    return this.usedMaterialsService.getPrice(id);
  }

  @apiDecoratorsGetTotalPriceByRoom(entityName)
  @Get('room/:id/total-price')
  getTotalPriceByRoom(@Param('id') id: string) {
    return this.usedMaterialsService.getTotalPriceByRoom(id);
  }

  @apiDecoratorsGetTotalPriceByProject(entityName)
  @Get('project/:id/total-price')
  getTotalPriceByProject(@Param('id') id: string) {
    return this.usedMaterialsService.getTotalPriceByProject(id);
  }

  @apiDecoratorsFindByMaterialId(entityName)
  @Get('material/:id')
  findByMaterialId(@Param('id') id: string) {
    return this.usedMaterialsService.findByMaterialId(id);
  }

  @apiDecoratorsDelete(entityName)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usedMaterialsService.delete(id);
  }
}
