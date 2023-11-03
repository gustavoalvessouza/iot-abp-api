import { IsNotEmpty } from 'class-validator';

export class CreateVendingMachineDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  location: string;
}

export class UpdateVendingMachineDTO {
  @IsNotEmpty()
  machineId: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  location: string;
}
