import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteVendingMachineDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
