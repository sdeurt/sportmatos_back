import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, UseInterceptors, ConflictException, NotFoundException, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService) { }
 
  /* création d'un nouveau User
  **email unique
  **hash password
  * @param createUserDto Dto contenant les données de la requête (Insomnia par exemple)
  * @returns Renvoie les data du nouveau User
  */

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    
    const saltOrRounds = 10;
    const IsEmailExist = await this.usersService.findOneByEmail(createUserDto.email);

    if (IsEmailExist) {
      throw new HttpException("L'Email est déjà utilisé", HttpStatus.BAD_REQUEST);
    }

  
    // Hashage du password
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
   
      const user = await this.usersService.create(createUserDto, hash)
    return {
      status: 201,
      message: 'user créé',
      data: user
    }
  };
  
  // Récupération de tous les users
  @Get()
  async findAll(): Promise<any> {
    const users = await this.usersService.findAll();

    return users;

  };

  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<any> {
    console.log('here');

    // Vérifie que l'email fournit n'existe pas déjà
    const isEmailExist = await this.usersService.findOneByEmail(email);
    if (!isEmailExist)
      throw new NotFoundException(
        `Cet email n'existe pas, veuillez entrer un e-mail valide`,
      );

    return isEmailExist;

  }

  @Get('id/:id')
  async findOneById(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOneById(+id);

    if (!user) {
      throw new HttpException("User id inexistant", HttpStatus.NOT_FOUND);
    };

    return {
      statusCode: 200,
      message: ' User sélectionné',
      data: user
    };
  };

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    const updateUser = await this.usersService.update(+id, updateUserDto);
    return {
      status: 200,
      message: ' user modifié',
      data: updateUser
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteUser = await this.usersService.remove(+id);
    return {
      status: 200,
      message: 'affichage user supprimé',
      data: deleteUser
    }
  }
}
