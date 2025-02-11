import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Material } from '../materials/schemas/material.schema';
import { UsedMaterial } from './schemas/used-material.schema';
import { Room } from '../rooms/schemas/room.schema';
import { CreateUsedMaterialDto } from './dto/create-used-material.dto';
import { calculatePrice } from './utils/calculatePrice';

@Injectable()
export class UsedMaterialsService {
  constructor(
    @InjectModel(UsedMaterial.name)
    private usedMaterialModel: Model<UsedMaterial>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  async create(
    createUsedMaterialDto: CreateUsedMaterialDto,
  ): Promise<UsedMaterial> {
    const createdUsedMaterial = new this.usedMaterialModel(
      createUsedMaterialDto,
    );

    if (createdUsedMaterial.materialId) {
      const material = await this.materialModel.findById(
        createdUsedMaterial.materialId,
      );
      if (!material) {
        throw new NotFoundException('Material not found');
      }
    }

    if (createdUsedMaterial.roomId) {
      const room = await this.roomModel.findById(createdUsedMaterial.roomId);
      if (!room) {
        throw new NotFoundException('Room not found');
      }
    }

    return createdUsedMaterial.save();
  }

  async findAll(): Promise<UsedMaterial[]> {
    return this.usedMaterialModel
      .find()
      .populate('roomId')
      .populate('materialId')
      .exec();
  }

  async findByRoomId(roomId: string): Promise<UsedMaterial[]> {
    return this.usedMaterialModel
      .find({ roomId })
      .populate('roomId')
      .populate('materialId')
      .exec();
  }

  async findByProjectId(projectId: string): Promise<UsedMaterial[]> {
    const usedMaterials = await this.usedMaterialModel
      .find()
      .populate({
        path: 'roomId',
        match: { projectId },
      })
      .populate('materialId')
      .exec();

    return usedMaterials.filter((usedMaterial) => usedMaterial.roomId !== null);
  }

  async findByMaterialId(materialId: string): Promise<UsedMaterial[]> {
    return this.usedMaterialModel
      .find({ materialId })
      .populate('materialId')
      .populate('roomId')
      .exec();
  }

  async findOne(id: string): Promise<UsedMaterial> {
    return this.usedMaterialModel
      .findById(id)
      .populate('materialId')
      .populate('roomId')
      .exec();
  }

  async getPrice(id: string): Promise<number> {
    const usedMaterial = await this.usedMaterialModel
      .findById(id)
      .populate('materialId')
      .exec();

    if (!usedMaterial) {
      throw new NotFoundException('Used material not found');
    }

    if (!usedMaterial.materialId) {
      throw new NotFoundException('Material not found');
    }

    return (
      parseFloat(usedMaterial.materialId.pricePerUnit.toString()) *
      parseFloat(usedMaterial.quantity.toString())
    );
  }

  async getTotalPriceByRoom(roomId: string): Promise<number> {
    const usedMaterials = await this.usedMaterialModel
      .find({ roomId })
      .populate('materialId')
      .populate('roomId')
      .exec();

    if (!usedMaterials.length) {
      throw new NotFoundException('No materials found for this room');
    }

    return calculatePrice(usedMaterials);
  }

  async getTotalPriceByProject(projectId: string): Promise<number> {
    const rooms = await this.roomModel.find({ projectId }).exec();
    if (!rooms.length) {
      throw new NotFoundException(`No rooms found for project ${projectId}`);
    }

    const usedMaterials = await this.usedMaterialModel
      .find({ roomId: { $in: rooms.map((room) => room._id) } })
      .populate('materialId')
      .exec();

    if (!usedMaterials.length) {
      throw new NotFoundException(
        `No materials found for project ${projectId}`,
      );
    }

    return calculatePrice(usedMaterials);
  }

  async delete(id: string): Promise<UsedMaterial> {
    return this.usedMaterialModel.findByIdAndDelete(id).exec();
  }
}
