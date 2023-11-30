import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteConveyorsDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}
