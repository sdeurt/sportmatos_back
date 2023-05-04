import { Injectable } from '@nestjs/common';
import { AddProductToCartDto } from './dto/addProductToCartDto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';


@Injectable()
export class CartService {

  /** Panier en cours d'un user  */
  async getCurrentCart(userId: number): Promise<Cart | null> {
    return await Cart.findOneBy({
      user: { id: userId },
      status: "en cours"
    })
  }

  /** Ajout d'un panier */

  async addCart(createCartDto: AddProductToCartDto): Promise<Cart> {
    const newCart = new Cart();
    /*   newCart.totalPrice = createCartDto.totalPrice; */
    /*   newCart.cartItems = createCartDto.cartItems; */

    await newCart.save();

    return newCart;
  }

  /** Récupération de tous les paniers  */

  async findAllCart(): Promise<Cart[]> {

    const carts = await Cart.find();

    if (carts.length > 0) {

      return carts
    }
    return undefined;
  }

  /** Récupération d'un panier par id  */

  async findOneById(id: number): Promise<Cart> {

    const cart = await Cart.findOneBy({ id })

    if (cart) {

      return cart;

    }
    return undefined;
  }

  /** Modification d'un  panier */

  async update(id: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cartUpdate = await Cart.findOneBy({ id });

    /*   cartUpdate.userId = updateCartDto.userId;
      cartUpdate.totalPrice = updateCartDto.totalPrice;
      cartUpdate.cartItems = updateCartDto.cartItems; */
    cartUpdate.date = updateCartDto.date;


    const cart = await cartUpdate.save();

    if (cartUpdate) {

      return cart;
    };

    return undefined;
  }


  /** suppression d'un panier */

  async remove(id: number): Promise<Cart> {
    const deleteCart = await Cart.findOneBy({ id });
    await deleteCart.remove();

    if (deleteCart) {
      return deleteCart;
    }
  }
}
