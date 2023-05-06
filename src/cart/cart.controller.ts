import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, Bind, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, Req, ForbiddenException } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/addProductToCartDto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Cart } from './entities/cart.entity';


@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  /**Création / ajout au panier et contrôler que le paramètre idProduct est bien un entier*/
  @Post('add/product/:idProduct')
  @Bind(Param('idProduct', ParseIntPipe))
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
  
  async addProductToCart(@Param('idProduct') idProduct: string, @Body() addProductToCartDto: AddProductToCartDto): Promise <any> {
     // Vérifie que le User est connecté 
    const userLogged = await this.cartService.findOneById(+idProduct);
    
     console.log(userLogged)
    if (!userLogged) {
      throw new ForbiddenException("Vous devez être authentifié pour ajouter le produit au panier");
    };
    const response = await this.cartService.addCart(addProductToCartDto);

    return {
      status: 201,
      message: "produit ajouté au panier ",
      data: response
    }
  }


  /** affichage tous les paniers */
  @Get()
  async findAll() {
    const allCarts = await this.cartService.findAllCart();

    if (!allCarts) {
      throw new HttpException("aucun panier trouvé", HttpStatus.NOT_FOUND);
    }
    return {
      status: 200,
      message: " liste des paniers",
      data: allCarts
    }
  }

  /** Recherche panier par id */

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const cart = await this.cartService.findOneById(+id);

    if (!cart) {
      throw new HttpException("ce panier n'existe pas ", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: "panier demandé",
      data: cart

    };
  }

  /** Modification du panier par id s'il existe */

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    const cart = await this.cartService.update(+id, updateCartDto);

    if (!cart) {
      throw new NotFoundException(`Le panier n'existe pas!`);

    }
    return {
      statusCode: 200,
      message: "Le panier a bien été modifié",
      data: cart
    }
  }

  /** Suppression du  panier par id */

  /** Vérification que le panier à supprimer existe */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    /**vérifier que le produit à supprimer existe */
    const isCartExist = await this.cartService.findOneById(+id);
    if (!isCartExist) {
      throw new NotFoundException(`le panier n'existe pas`);
    };
    await this.cartService.remove(+id);
    /**supprime le panier sélectionné */

    if (isCartExist)
      return {
        statusCode: 200,
        message: 'panier supprimée',
        data: isCartExist,
      };
  };

}

