import { Module } from '@nestjs/common';
import { productController } from './product.controller';
import { PrismaService } from 'src/database';
import { HandleErrors } from 'src/utils/HandleErrors';
import { ProductRepository } from 'src/repositories';

import { CreateProductUseCase, UpdateProductUseCase, FindAllProductUseCase, DeleteProductUseCase } from './use-case';

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
  ],
  exports: [],
  controllers: [productController],
})
export class ProductModule {}
