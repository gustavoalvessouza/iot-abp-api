import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { DataProductConveyorsDTO } from './DataProductConveyors.dto';

export class AddProductConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataProductConveyorsDTO)
  data: DataProductConveyorsDTO;
}
