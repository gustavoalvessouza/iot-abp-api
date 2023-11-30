import { IsNotEmpty, IsString } from 'class-validator';

export class FindProductsVendingMachineDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
