import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  /**Création / ajout au panier */
  @Post()
  async addCart(@Body() createCartDto: CreateCartDto) {

    const response = await this.cartService.addCart(createCartDto);

    return {
      status: 201,
      message: "panier ajouté",
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

  @Delete(':id')
  async remove(@Param('id') id: string) {

    /** Vérification que le panier à supprimer existe */
    const isCartExists = await this.cartService.remove(+id);

    if (!isCartExists) {
      throw new NotFoundException(`le panier n'existe pas`);
    };
    /**supprime le panier sélectionné */
    await this.cartService.remove(+id);

    return {
      statusCode: 200,
      message: ' produit supprimé',
      data: isCartExists
    }
  }
}
