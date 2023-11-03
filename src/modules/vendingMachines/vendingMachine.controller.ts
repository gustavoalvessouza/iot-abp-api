import {
  Controller,
  Inject,
  Post,
  Put,
  Body,
  Response,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { VendingMachineService } from './vendingMachine.service';
import {
  CreateVendingMachineDTO,
  UpdateVendingMachineDTO,
} from './domain/dto/vendingMachine.dto';

@Controller('vending-machines')
export class VendingMachineController {
  constructor(
    @Inject(VendingMachineService) private service: VendingMachineService,
  ) {}

  @Post()
  async create(@Body() body: CreateVendingMachineDTO) {
    return this.service.create(body);
  }

  @Put()
  async update(@Res() res: Response, @Body() body: UpdateVendingMachineDTO) {
    const { errors, result } = await this.service.update(body);
    console.log(errors);

    if (errors.length > 0) {
      throw new HttpException({ errors }, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
