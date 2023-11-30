import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { DataConveyorsDTO } from './DataConveyors.dto';

export class CreateConveyorsDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => DataConveyorsDTO)
  data: DataConveyorsDTO;
}
