import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Decimal128 } from 'mongoose';

@Schema({ timestamps: true })
export class Material {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pricePerUnit: Decimal128;

  @Prop({ required: true })
  unit: string;

  @Prop()
  url: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
