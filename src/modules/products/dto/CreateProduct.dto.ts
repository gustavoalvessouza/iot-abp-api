import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { DataProductDTO } from './DataProduct.dto';

export class CreateProductDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => DataProductDTO)
  data: DataProductDTO;
}
