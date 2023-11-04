import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { DataProductDTO } from './DataProduct.dto';

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataProductDTO)
  data: DataProductDTO;
}
