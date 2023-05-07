import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartItemService {
 
  async create(cart: Cart, product: Product, quantity: number): Promise<CartItem> {

    /**ajouter un produit au panier */
    const newCartItem = new CartItem();

    newCartItem.quantity = quantity;
    newCartItem.cart = cart;
    newCartItem.product = product;
      
    await newCartItem.save();

    return newCartItem;

  };

  async update(cart: Cart, product: Product, quantity: number): Promise<CartItem> {
    
    const updateCartItem = await CartItem.findOneBy({ cart: { id: cart.id }, product: { id: product.id } });

    updateCartItem.quantity = quantity;
   
    await updateCartItem.save();

    return updateCartItem;
  }


  async delete(cart: Cart, product: Product): Promise<CartItem> {
    
    const deleteCartItem = await CartItem.findOneBy({ cart: { id: cart.id }, product: { id: product.id } });

    await deleteCartItem.remove();

    return deleteCartItem;
  }

 

}