import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveProductConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
