import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRoomDto } from './dto/create-room.dto';
import { Project } from '../projects/schemas/project.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDto);

    if (createdRoom.projectId) {
      const project = await this.projectModel.findById(createdRoom.projectId);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
    }
    return createdRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    return this.roomModel.findById(id).exec();
  }

  async findByProjectId(projectId: string): Promise<Room[]> {
    return this.roomModel.find({ projectId }).exec();
  }

  async delete(id: string): Promise<Room> {
    return this.roomModel.findByIdAndDelete(id).exec();
  }
}
