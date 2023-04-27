import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {

    const response = await this.productsService.addProduct(createProductDto);

    return {
      status: 201,
      message: "produit ajouté",
      data: response
    }
  }

  @Get()
  async findAll() {
    const allProducts = await this.productsService.findAllProducts();
    if (!allProducts) {
      throw new HttpException("aucun produit trouvé", HttpStatus.NOT_FOUND);
    }
    return {
      status: 200,
      message: " liste des produits",
      data: allProducts
    }
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const product = await this.productsService.findOneById(+id);
    if (!product) {
      throw new HttpException("ce produit n'est pas en stock", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: "produit demandé",
      data: product
      
    };
  }

  @Get('name/:name')
  async findOne(@Param('name') name: string) {
    //vérifie que le nom existe
    const isProductExist = await this.productsService.findOneByName(name);
    if (!isProductExist) {
      throw new NotFoundException(`le produit n'existe pas`);
    }
    return {
      statusCode: 200,
      message: "produit demandé",
      data: isProductExist
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    
    const product = await this.productsService.update(+id, updateProductDto);
    
    if (!product) { 
    throw new NotFoundException(`Le produit n'existe pas!`);
    
  }
    return {
      statusCode: 200,
      message: "Le produit a bien été modifié",
      data: product
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    /**vérifier que le produit à supprimer existe */
    const isProductExist = await this.productsService.findOneById(+id);
    if (!isProductExist) {
      throw new NotFoundException(`le produit n'existe pas`);
    };
    /**supprime le produit sélectionné */
    await this.productsService.remove(+id);

    return {
      statusCode: 200,
      message: ' produit supprimé',
      data: isProductExist
    }
  }
}
