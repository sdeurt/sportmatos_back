import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FilterProductDto } from './dto/filter.product.dto';

@Injectable()
export class ProductsService {

  /**crée un nouveau produit */
  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new Product();

    newProduct.name = createProductDto.name;
    newProduct.description = createProductDto.description;
    newProduct.price= createProductDto.price;
    newProduct.image = createProductDto.image;
    newProduct.stock = createProductDto.stock;

    await newProduct.save();

    return newProduct;
  }

  /** récupère tous les produits */
  async findAllProducts(): Promise<Product[]> {
    const products = await Product.find();
    if (products.length > 0) {
      return products;
    };
  };

  /** Récupère un User par son id*/
  async findOneById(id: number): Promise<Product> {
    const product = await Product.findOneBy({ id });

    if (product) {
      return product;
    };

    return undefined;
  };

  /** récupérère le produit par son nom */
  async findOneByName(name: string): Promise<Product> {
    const product = await Product.findOneBy({ name });
    if (product) {
      return product;
    }
    return undefined;
  }

  /**modification d'un produit */
  async update(id: number, updateProductDto: UpdateProductDto) {
    const productUpdate = await Product.findOneBy({ id })
    productUpdate.name = updateProductDto.name;
    productUpdate.price = updateProductDto.price;
    productUpdate.image = updateProductDto.image;
    productUpdate.stock = updateProductDto.stock;
    productUpdate.description = updateProductDto.description;

    const product = await productUpdate.save();

    if (updateProductDto) {
      return product;
    }
    return undefined;
  }

  /** suppression d'un produit */
  async remove(id: number): Promise<Product> {
    const deleteProduct = await Product.findOneBy({ id });
    await deleteProduct.remove();

    if (deleteProduct) {
      return deleteProduct;
    }
  }
}
