import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Material } from './schemas/material.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<Material> {
    const createdMaterial = new this.materialModel(createMaterialDto);
    return createdMaterial.save();
  }

  async findAll(): Promise<Material[]> {
    return this.materialModel.find().exec();
  }

  async findOne(id: string): Promise<Material> {
    return this.materialModel.findById(id).exec();
  }

  async delete(id: string): Promise<Material> {
    return this.materialModel.findByIdAndDelete(id).exec();
  }
}
