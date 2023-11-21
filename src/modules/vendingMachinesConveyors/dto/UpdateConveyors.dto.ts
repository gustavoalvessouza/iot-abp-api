import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { DataConveyorsDTO } from './DataConveyors.dto';

export class UpdateConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataConveyorsDTO)
  data: DataConveyorsDTO;
}
