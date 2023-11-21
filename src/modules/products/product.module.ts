import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { PrismaService } from 'src/database';
import { HandleErrors } from 'src/utils/handleErrors';
import { ProductRepository } from 'src/repositories';

import { CreateProductUseCase, UpdateProductUseCase, FindAllProductUseCase, DeleteProductUseCase } from './use-case';
import { Masks } from 'src/utils/masks/Masks';

@Module({
  imports: [],
  providers: [
    HandleErrors,
    PrismaService,
    ProductRepository,
    CreateProductUseCase,
    UpdateProductUseCase,
    FindAllProductUseCase,
    DeleteProductUseCase,
    Masks,
  ],
  exports: [],
  controllers: [productController],
})
export class ProductModule {}
