import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { DataVendingMachineDTO } from './DataVendingMachine.dto';

export class CreateVendingMachineDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => DataVendingMachineDTO)
  data: DataVendingMachineDTO;
}
