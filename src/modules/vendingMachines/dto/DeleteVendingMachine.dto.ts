import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteVendingMachineDTO {
  @IsString()
  @IsNotEmpty()
  machineId: string;
}
