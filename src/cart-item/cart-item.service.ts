import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartItemService {
 
  async addProductToCartItem(createCartItemDto: CreateCartItemDto, user: User): Promise<CartItem> {

    /**ajouter un produit au panier */
    const newCartItem = new CartItem();

    newCartItem.quantity = createCartItemDto.quantity;
    newCartItem.cartId = createCartItemDto.cartId;
    newCartItem.productId = createCartItemDto.producId;

    newCartItem.users.push(user);
    await newCartItem.save();

    return newCartItem;

  };

  // Récupération de tous les détails paniers
 async findAll(): Promise<CartItem []> {
    return await CartItem.find({relations: ['users', 'carts', 'products']});
  }

  //Récupération d'un détail panier par id
  async findOneById(id: number) : Promise<CartItem> {
  return  await CartItem.findOne({relations:{cart:true, product: true}, where:{id}  });
      
  }

  //Modification cartItem
  async update(cartItem: CartItem, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    
    cartItem.quantity = updateCartItemDto.quantity;
    cartItem.cartId = updateCartItemDto.cartId;
    cartItem.productId = updateCartItemDto.producId;

    return await cartItem.save();
    
  }

  //supprime le produit du panier
  async removeProductFromCartItem(cartItemId: number, user: User) : Promise <CartItem> {
 
 
    // Vérifie que le produit existe
    const cartItem = await CartItem.findOne({ relations: { users: true }, where: { id: cartItemId } });
  
    if (!cartItem) {
      throw new NotFoundException(" Ce détail panier n'existe pas");
    };
    
     // Crée un nouveau tableau des produits du user sans le produit à supprimer
    const newPoductList = cartItem.users.map(user => {
      if (user.id !== user.id) {
        return newPoductList
      };

    });

    // Remplace le tableau de produits du cartItem par le nouveau tableau
    cartItem.users = newPoductList;

    cartItem.save();

    return cartItem;
  };

  // suppression du cartItem par son id
  async delete(id: number): Promise<CartItem> {
    const cartItem = await CartItem.findOneBy({ id });
    if (cartItem) {
      return await cartItem.remove();
    }

  };
};