import { IsNotEmpty, IsString } from 'class-validator';

export class DataVendingMachineDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
