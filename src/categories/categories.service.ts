import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from 'src/products/entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CategoriesService {

  //création d'une nouvelle
  async create(createCategoryDto: CreateCategoryDto, product:Product): Promise<Category> {
    const category = new Category();

    category.name = createCategoryDto.name;
    
    await category.save();

    return category;

  }

  //récupération de toutes les catégories
  async findAll() {
    return await Category.find();
  };

  //récupération de toutes les catégories des produits
  async findAllCategoriesByProductId(id: number) {
    return await Category.find({ where: { products: { id: id } } });
  };


 // récupération de la catégorie par son id
 async findById(id: number) {
  return await Category.findOneBy({ id });
};

  
  // modification de la catégorie
  async update(category: Category, updateCategoryDto: UpdateCategoryDto) {
  
    category.name = updateCategoryDto.name

    await category.save();

    return await Category.findOneBy( {name:category.name});
  };

  // suppression catégorie par son id
  async delete(id: number) {
    const category = await Category.findOneBy({ id });


    if (category) {
      await category.remove();
      return category;
    };

    throw new HttpException('catégorie non trouvée', HttpStatus.NOT_FOUND);
  };
  }

