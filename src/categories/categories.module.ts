import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ProductsService, UsersService]
})
export class CategoriesModule {}
