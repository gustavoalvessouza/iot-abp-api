import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteVendingMachineConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
