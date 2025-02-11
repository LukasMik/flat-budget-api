import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMaterialDto } from './dto/create-material.dto';
import { MaterialsService } from './materials.service';
import {
  apiDecoratorsCreate,
  apiDecoratorsDelete,
  apiDecoratorsFindAll,
  apiDecoratorsFindOne,
} from 'src/common/api-decorator';

const entityName = 'Material';

@ApiTags('Materials')
@Controller({
  version: '1',
  path: 'materials',
})
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @apiDecoratorsFindAll(entityName)
  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @apiDecoratorsFindOne(entityName)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @apiDecoratorsCreate(entityName)
  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @apiDecoratorsDelete(entityName)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.materialsService.delete(id);
  }
}
