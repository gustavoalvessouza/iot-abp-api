import { Inject, Injectable } from '@nestjs/common';
import { VendingMachineRepository } from 'src/repositories/vendingMachines';
import { IVendingMachineUseCaseExecute } from '../types/use-case.types';
import { ErrorService } from 'src/utils/ReponseErrors';

@Injectable()
export class VendingMachineUseCase {
  constructor(
    @Inject(VendingMachineRepository)
    private repository: VendingMachineRepository,

    @Inject(ErrorService)
    private error: ErrorService,
  ) {}

  async execute({
    machineId,
  }: IVendingMachineUseCaseExecute): Promise<string[]> {
    await this.checkMachineExists(machineId);

    return this.error.errors;
  }

  //#region IMPLEMENATION
  private async checkMachineExists(machineId: string) {
    const machine = await this.repository.find({
      select: {
        id: true,
      },
      where: { id: machineId },
    });

    if (!machine) {
      this.error.add('Vending machine not found');
    }
  }
  //#endregion
}
