import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from './schemas/material.schema';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
    ]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
