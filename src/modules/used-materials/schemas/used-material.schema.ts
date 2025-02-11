import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Material } from 'src/modules/materials/schemas/material.schema';
import { Room } from 'src/modules/rooms/schemas/room.schema';

@Schema({ timestamps: true })
export class UsedMaterial {
  @Prop({ required: true })
  quantity: Types.Decimal128;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
    required: true,
  })
  materialId: Material;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  })
  roomId: Room;
}

export const UsedMaterialSchema = SchemaFactory.createForClass(UsedMaterial);
