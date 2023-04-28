import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';


@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService

  ) { }

  /** Création d'une catégorie  
    * Nécessite :
    * * d'être connecté/enregistré
    * * d'être un admin
    */
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    /*  // Vérifie que le User connecté est un admin
    const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;

    if (!userLoggedAdmin) {
      throw new ForbiddenException("Vous devez être admin pour créer une catégorie");
    };  */


    // Vérifie que le produit existe
    const isProductExists = await this.productsService.findOneById(createCategoryDto.productId);

    if (!isProductExists) {
      throw new NotFoundException("produit Id inconnu");
    };

    //création d'une nouvelle catégorie
    const category = await this.categoriesService.create(createCategoryDto, isProductExists);
    return {
      statusCode: 201,
      message: 'catégorie créée',
      data: category
    };
  };

  /** Récupération de toutes les catégories */
  @Get()
  async findAll() {
    const allCategories = await this.categoriesService.findAllCategories();

    if (!allCategories) {
      throw new HttpException("aucune catégorie trouvée", HttpStatus.NOT_FOUND);
    }
    return {
      status: 200,
      message: " liste des catégories",
      data: allCategories
    }
  }


  //trouver la catégorie par son id
  @Get(':id')
  async findOneBy(@Param('id') id: string) {
    const categorie = await this.categoriesService.findById(+id);
    if (!categorie) {
      throw new HttpException("Cette catégorie n'existe pas", HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: 200,
      message: "catégorie demandée",
      data: categorie

    };
  }


  /** modification d'une catégorie  
  * Nécessite :
  * * d'être connecté/enregistré
  * * d'être une admin
  */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {

    /*   // Vérifie que le User connecté est un admin
      const userLoggedAdmin = (await this.categoriesService.findById(+id)).admin;
  
      if (!userLoggedAdmin) {
        throw new ForbiddenException("Vous devez être admin pour créer une catégorie");
      };
      
      return await this.categoriesService.update({+id:id} , updateCategoryDto);
    } */

    //vérification que la catégorie existe
    const isCategoryExists = await this.categoriesService.findById(+id);

    if (!isCategoryExists) {
      throw new NotFoundException("La catégorie n'existe pas");
    };


    // Modifie la catégorie sélectionnée
    const updatedCategory = await this.categoriesService.update(isCategoryExists, updateCategoryDto);
    if (updatedCategory)
      return {
        statusCode: 200,
        message: 'catégorie modifiée',
        data: updatedCategory,
      };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, updateCategoryDto: UpdateCategoryDto) {

    /*   // Vérifie que le User connecté est un admin
      const userLoggedAdmin = (await this.usersService.findOneById(req.user.id)).admin;
  
      if (!userLoggedAdmin) {
        throw new ForbiddenException("Vous devez être admin pour supprimer une catégorie");
      };
       */
    // suppression catégorie
    const category = await this.categoriesService.delete(+id);

    if (category)
      return {
        statusCode: 200,
        message: 'catégorie supprimée',
        data: category,
      };

    throw new HttpException('catégorie not found', HttpStatus.NOT_FOUND);
  };
};
