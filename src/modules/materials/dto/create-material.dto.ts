import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Material name is required' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Material price per unit is required' })
  @IsNumber()
  pricePerUnit: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Material unit is required' })
  @IsString()
  unit: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  url: string;
}
