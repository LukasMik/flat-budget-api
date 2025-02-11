import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Project, ProjectSchema } from '../projects//schemas/project.schema';
import {
  UsedMaterial,
  UsedMaterialSchema,
} from '../used-materials/schemas/used-material.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([
      { name: UsedMaterial.name, schema: UsedMaterialSchema },
    ]),
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
