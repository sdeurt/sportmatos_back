import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ForbiddenException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('cart-item')
export class CartItemController {
  usersService: any;
  constructor(private readonly cartItemService: CartItemService) { }

  /** Création d'un nouveau Training   
   * Nécessite :
   * * d'être connecté/enregistré
   */
  @Post()
  async addProductToCartItem(@Body() createCartItemDto: CreateCartItemDto, user: User, @Request() req): Promise<any> {
    const userLogged = (await this.usersService.findOneById(req.user.id));

    if (!userLogged) {
      throw new ForbiddenException("Vous devez vous enregistrer pour ajouter au panier");
    };

    //ajout d'un nouveau produit dans cartItem
    const newProductList = await this.cartItemService.addProductToCartItem(createCartItemDto, user);
    return {
      statusCode: 201,
      massage: "Votre produit est ajouté dans le panier",
      data: newProductList

    }
  }

  @Get()
  async findAll() {
    const cartItems = await this.cartItemService.findAll();

    if (!cartItems) {
      throw new NotFoundException(`Le panier n'existe pas.`)
    }
    return cartItems
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const cartItem = await this.cartItemService.findOneById(+id);
    if (!cartItem) {
      throw new NotFoundException(`Le panier avec cet id n'existe pas`);
    }
    return cartItem
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartItemDto, @Request() req): Promise<any> {
    //Vérifie que le User est authentifié/connecté
    const userLogged = (await this.usersService.findOneById(req.user.id));

    if (!userLogged) {
      throw new ForbiddenException(`Vous devez être authentifié pour modifier ou ajouter dans le panier`);
    }

    //Vérifie que le cartItem existe
    const isCartItemExist = await this.findById(id);

    if (!isCartItemExist) {
      throw new NotFoundException(`Ce panier avec cet id n'existe pas `);

    }

    //Modification du panier

    const updateCartItem = await this.cartItemService.update(isCartItemExist, updateCartItemDto);

    return updateCartItem;

  };

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {

    //Vérifie que le User est authentifié
    const userLogged = (await this.usersService.findOneById(req.user.id));

    //vérifie et envoie message erreur si l'User n'est pas authentifié
    if (!userLogged) {
      throw new ForbiddenException("Vous devez être authentifié pour supprimer un produit du panier");
    };

    // Vérifie que le panier de produit à supprimer existe
    const deletedCartItem = await this.cartItemService.findOneById(+id);

    if (!deletedCartItem) {
      throw new HttpException(`le panier du produit n'existe pas`, HttpStatus.NOT_FOUND);
    };

    // Vérifie si le produi a été ajouté au panier du User
    if (deletedCartItem.users.length > 0) {
      deletedCartItem.users.map((user: any) => this.usersService.removeFromCart(user, +id))
    };

    // Supprime cartItem
    const cartItem = await this.cartItemService.delete(+id);

    return {
      statusCode: 200,
      message: 'Le contenu de votre panier est supprimé',
      data: cartItem,

    };
  }
}
