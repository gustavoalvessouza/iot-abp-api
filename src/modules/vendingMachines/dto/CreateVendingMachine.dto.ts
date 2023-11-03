import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { DataVendingMachineDTO } from './DataVendingmachine.dto';

export class CreateVendingMachineDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => DataVendingMachineDTO)
  data: DataVendingMachineDTO;
}
