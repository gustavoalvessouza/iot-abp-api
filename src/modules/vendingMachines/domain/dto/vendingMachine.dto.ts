import { IsNotEmpty } from 'class-validator';

export class CreateVendingMachineRequestBodyDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  location: string;
}
