import { Controller, Inject, Post, Body } from '@nestjs/common';
import { VendingMachineService } from './vendingMachine.service';
import { CreateVendingMachineRequestBodyDTO } from './domain/dto/vendingMachine.dto';

@Controller('vending-machines')
export class VendingMachineController {
  constructor(
    @Inject(VendingMachineService) private service: VendingMachineService,
  ) {}

  @Post('create')
  async create(@Body() body: CreateVendingMachineRequestBodyDTO) {
    return this.service.create(body);
  }
}
