import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterShoppingDTO {
  @IsString()
  @IsNotEmpty()
  conveyorId: string;
}
