import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { DataVendingMachineDTO } from './DataVendingMachine.dto';

export class UpdateVendingMachineDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DataVendingMachineDTO)
  data: DataVendingMachineDTO;
}
