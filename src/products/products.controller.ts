import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
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
    return await this.productsService.addProduct(createProductDto);
  }

  @Get()
  async findAll() {
    return await this.productsService.findAllProducts();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.productsService.findOneById(+id);
  }

  @Get('name/:name')
  async findOne(@Param('name') name: string) {
    //vérifie que le nom existe
    const isProductExist = await this.productsService.findOneByName(name);
    if (!isProductExist) {
      throw new NotFoundException(`le produit n'existe pas`);
    }
    return await this.productsService.findOneByName(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productsService.update(+id, updateProductDto);
    if (!product) throw new NotFoundException(`Le produit n'existe pas!`);
    return product;
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
