import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { DataVendingMachineDTO } from './DataVendingmachine.dto';

export class UpdateVendingMachineDTO {
  @IsString()
  @IsNotEmpty()
  machineId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataVendingMachineDTO)
  data: DataVendingMachineDTO;
}