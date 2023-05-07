import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductsService } from 'src/products/products.service';
import { CartItemService } from 'src/cart-item/cart-item.service';

@Module({
  controllers: [CartController],
  providers: [CartService, ProductsService, CartItemService]
})
export class CartModule {}
