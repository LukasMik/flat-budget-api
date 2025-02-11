import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Room name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Project ObjectId',
    type: String,
  })
  @IsMongoId({ message: 'Invalid projectId format' })
  @IsNotEmpty({ message: 'Project ID is required' })
  projectId: Types.ObjectId;
}
