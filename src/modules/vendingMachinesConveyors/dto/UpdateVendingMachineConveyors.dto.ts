import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { DataVendingMachineConveyorsDTO } from './DataVendingMachineConveyors.dto';

export class UpdateVendingMachineConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataVendingMachineConveyorsDTO)
  data: DataVendingMachineConveyorsDTO;
}
