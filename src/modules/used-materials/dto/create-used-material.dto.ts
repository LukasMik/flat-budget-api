import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUsedMaterialDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Material quantity is required' })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Project ObjectId',
    type: String,
  })
  @IsMongoId({ message: 'Invalid materialId format' })
  @IsNotEmpty({ message: 'Material ID is required' })
  materialId: Types.ObjectId;

  @ApiProperty({
    description: 'Project ObjectId',
    type: String,
  })
  @IsMongoId({ message: 'Invalid roomId format' })
  @IsNotEmpty({ message: 'Room ID is required' })
  roomId: Types.ObjectId;
}
