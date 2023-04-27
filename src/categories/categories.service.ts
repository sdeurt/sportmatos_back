import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from 'src/products/entities/product.entity';
import { Category } from './entities/category.entity';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CategoriesService {

  //création d'une nouvelle
  async create(createCategoryDto: CreateCategoryDto, product: Product): Promise<Category> {
    const category = new Category();

    category.name = createCategoryDto.name;
    
    await category.save();

    return category;

  }

  //récupération de toutes les catégories
  async findAllCategories(): Promise<Category[]> {
    const categories = await Category.find({ relations: {products: true}});
    if (categories.length > 0) {
      return categories;
    }
  };


  // récupération de la catégorie par son id
  async findById(id: number): Promise<Category> {
    const category = await Category.findOneBy({ id });

    if (category) {

      return category;
    }
    return undefined;
  };

  
  // modification de la catégorie
  async update(category: Category, updateCategoryDto: UpdateCategoryDto) {
    const categoryUpdate = await Category.findOneBy({ name: category.name });
   
    category.name = updateCategoryDto.name

    const categorie = await categoryUpdate.save();
    
    if (updateCategoryDto) {
      return categorie;
    }

    return undefined;
  };

  // suppression catégorie par son id
  async delete(id: number): Promise<Category> {
    const deleteCategory = await Category.findOneBy({ id });
    await deleteCategory.remove();


    if (deleteCategory) {
      return deleteCategory;
    };

  }
}
