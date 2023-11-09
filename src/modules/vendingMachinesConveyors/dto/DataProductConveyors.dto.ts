import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DataProductConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
