import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindAllProductDTO {
  @IsNumberString()
  @IsNotEmpty()
  page: string;

  @IsNumberString()
  @IsNotEmpty()
  take: string;
}
