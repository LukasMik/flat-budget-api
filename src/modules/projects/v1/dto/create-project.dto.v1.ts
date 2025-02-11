import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Project name is required' })
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  description: string;
}
