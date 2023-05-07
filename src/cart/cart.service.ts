import { Injectable, UseGuards } from '@nestjs/common';
import { AddProductToCartDto } from './dto/addProductToCartDto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { CreateCartItemDto } from 'src/cart-item/dto/create-cart-item.dto';


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

  async addCart(user: User): Promise<Cart> {
    const newCart = new Cart();
    newCart.user = user;
    newCart.cartItems = [];

    await newCart.save();

    return newCart;
  }
  
 /**
   * Méthode pour recalculer le total du panier lorsqu'un produit est ajouté,
   * modifié ou supprimer*/
  
  async recalculateCart(user:User) {
    const cart = await this.getCurrentCart(user.id);
    const totalPrice = cart.cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
    }, 0);
    cart.totalPrice = totalPrice;
    return await cart.save();
  }

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

    cartUpdate.totalPrice = updateCartDto.totalPrice;
    cartUpdate.date = updateCartDto.date;


    const cart = await cartUpdate.save();

    if (cartUpdate) {

      return cart;
    };

    return undefined;
  }


  /** suppression d'un panier */

  async remove( id: number): Promise<Cart> {
    const deleteCart = await Cart.findOneBy({id});
    await deleteCart.remove();

    if (deleteCart) {
      return deleteCart;
    }

    
      
    }


  }

