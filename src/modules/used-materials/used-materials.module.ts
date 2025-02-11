import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '../rooms/schemas/room.schema';
import {
  UsedMaterial,
  UsedMaterialSchema,
} from './schemas/used-material.schema';
import { Material, MaterialSchema } from '../materials/schemas/material.schema';
import { UsedMaterialsController } from './used-materials.controller';
import { UsedMaterialsService } from './used-materials.service';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsedMaterial.name, schema: UsedMaterialSchema },
    ]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
    ]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [UsedMaterialsController],
  providers: [UsedMaterialsService],
})
export class UsedMaterialsModule {}
