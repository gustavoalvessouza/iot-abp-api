import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositories';

import { FindAllProductDTO } from '../dto';

@Injectable()
export class FindAllProductUseCase {
  //#region DEPENDENCIES
  @Inject(ProductRepository) private repository: ProductRepository;

  //#endregion

  async execute({ take, page }: FindAllProductDTO) {
    return this.findAllMachines({ page, take });
  }

  //#region IMPLEMENATION
  private async findAllMachines({ page, take }: FindAllProductDTO) {
    return this.repository.findAll({ take, page });
  }
  //#endregion
}
