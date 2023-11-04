import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { DataVendingMachineConveyorsDTO } from './DataVendingMachineConveyors.dto';

export class CreateVendingMachineConveyorsDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => DataVendingMachineConveyorsDTO)
  data: DataVendingMachineConveyorsDTO;
}
