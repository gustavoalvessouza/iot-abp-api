import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from '../../repositories/vendingMachines';
import { Prisma, vendingMachines } from '@prisma/client';

@Injectable()
export class VendingMachineService {
  constructor(
    @Inject(VendingMachineRepository)
    private repository: VendingMachineRepository,
  ) {}

  async create(
    data: Prisma.vendingMachinesCreateInput,
  ): Promise<vendingMachines> {
    return this.repository.create(data);
  }
}
