import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
