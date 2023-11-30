import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindAllVendingMachineDTO {
  @IsNumberString()
  @IsNotEmpty()
  page: string;

  @IsNumberString()
  @IsNotEmpty()
  take: string;
}
