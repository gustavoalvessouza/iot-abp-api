import { IsNotEmpty, IsString } from 'class-validator';

export class CheckHasShoppingDTO {
  @IsString()
  @IsNotEmpty()
  machineId: string;
}
