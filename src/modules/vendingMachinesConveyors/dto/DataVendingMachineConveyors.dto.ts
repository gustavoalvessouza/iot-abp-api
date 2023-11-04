import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataVendingMachineConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  vendingMachineId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  espIp: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
