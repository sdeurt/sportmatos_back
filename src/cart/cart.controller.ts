import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, Bind, ParseIntPipe, ClassSerializerInterceptor, UseInterceptors, Req, ForbiddenException, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/addProductToCartDto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { ProductsService } from 'src/products/products.service';
import { CartItemService } from 'src/cart-item/cart-item.service';


@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productsService: ProductsService,
    private readonly cartItemService: CartItemService,
  ) { }

  /**Création / ajout au panier et contrôler que le paramètre idProduct est bien un entier*/
  @UseGuards(JwtAuthGuard)
  @Post('product/:idProduct') //
  @Bind(Param('idProduct', ParseIntPipe))
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password

  async addProductToCart(@Param('idProduct') idProduct: string, @Body() addProductToCartDto: AddProductToCartDto, @Req() req: any): Promise<any> {
    // Vérifie que le User est connecté et la quantité demandé 
    const user = req.user;
    const quantity = addProductToCartDto.quantity;



    //Vérification existence produit
    const product = await this.productsService.findOneById(+idProduct);
    console.log(product);

    if (!product) {
      throw new NotFoundException(` Ce produit n'existe pas`);

    }
    //Vérification stock et quantité disponible(so)
    // Le stock doit être strictement inférieur à la quantité à ajouter pour envoyer message erreur
    if (product.stock < quantity) {

      throw new NotFoundException(`Le produit n'est plus en stock en quantité suffisante`)
    }

    //Tentative de récupération du panier en cours du User
    let currentCart = await this.cartService.getCurrentCart(user.id);

    //Si tentative ratée création d'un nouveau panier
    if (!currentCart) {

      currentCart = await this.cartService.addCart(user);
    }

    //Vérification de la présence ou non du produit parmi les cartitems de Cart, filtre liste cartItem 
    const cartItems = currentCart.cartItems.filter((item) => {

      return item.product.id === product.id;

    })

    let cartItem: CartItem;
    if (quantity !== 0) {
      if (cartItems.length === 0) { // Vérification si le cartItem n'existe pas 

        cartItem = await this.cartItemService.create(currentCart, product, quantity);
      }
      else { // si il existe => mise à jour: ces cartIems mappés

        cartItem = await this.cartItemService.update(currentCart, product, quantity);

      }
    }
    else { //exclure du currentcart le cartItem en trop, d'abord le delete
      cartItem = await this.cartItemService.delete(currentCart, product);


    }
    // déclenche cartItem avant de continuer => temporisation : resynchronisation
    Promise.all([cartItem])
    Promise.all([await this.cartService.recalculateCart(user)]);
    return {
      status: 201,
      message: "produit ajouté au panier ",
      data: await this.cartService.getCurrentCart(user.id)
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


  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @UseInterceptors(ClassSerializerInterceptor) // permet de ne pas renvoyer le password

  async removeItemFromCart(@Param('id') userId: string, idProduct: string) {

    /**vérifier que le produit à supprimer existe */
    const isCartExist = await this.cartService.findOneById(+{ userId, idProduct });
    if (!isCartExist) {
      throw new NotFoundException(`le panier n'existe pas`);
    };

    await this.cartService.remove(+{ userId, idProduct });
    /**supprime le panier sélectionné */

    if (isCartExist)
      return {
        statusCode: 200,
        message: 'panier supprimé',
        data: isCartExist,
      };
  };
 
  
}



