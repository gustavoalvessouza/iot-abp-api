import { IsNotEmpty, IsString } from 'class-validator';

export class DataConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  vendingMachineId: string;

  @IsString()
  @IsNotEmpty()
  espIp: string;
}
