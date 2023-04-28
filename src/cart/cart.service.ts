import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';


@Injectable()
export class CartService {

  /** Récupération de tous les paniers */
  
 async addCart(createCartDto: CreateCartDto): Promise <Cart> {
   const newCart = new Cart();

   newCart.quantity = createCartDto.quantity;
   
   await newCart.save();

   return newCart;
  }

  /** Récupération de tous les paniers  */
  
  async findAllCart(): Promise<Cart []> {
    
    const carts = await Cart.find();

    if (carts.length > 0) {

      return carts
    }
    return undefined ;
  }

  /** Récupération d'un panier  */
  
  async findOneById (id: number) : Promise< Cart > {
    
    const cart = await Cart.findOneBy({id})
   
    if (cart) {

      return cart;

    }
    return undefined ;
  }

  /** Modification d'un  panier */
  
  async update(id: number, updateCartDto: UpdateCartDto): Promise < Cart >{
    const carUpdate = await Cart.findOneBy({ id });

    carUpdate.id = updateCartDto.id;
    carUpdate.quantity = updateCartDto.quantity;

    const cart = await carUpdate.save();

    if (carUpdate) {

      return cart;
    };

    return undefined;
  }


  /** suppression d'un panier */

  async remove(id: number) : Promise < Cart > {
    const deleteCart = await Cart.findOneBy({ id });
    await deleteCart.remove();

    if (deleteCart) {
      return deleteCart;
    }
  }
}
