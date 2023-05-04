import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  /*crée un nouveau User hash: string*/
  async create(createUserDto: CreateUserDto,): Promise<User> {
    const newUser = new User();

    newUser.firstname = createUserDto.firstname;
    newUser.lastname = createUserDto.lastname;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.address = createUserDto.address;
    //newUser.password = hash;


    await newUser.save();
    newUser.password = undefined;
    return newUser;
  }


  /** Récupère tous les Users */
  async findAll(): Promise<User[]> {
    const users = await User.find({  relations: { carts: true  } });

    if (users.length > 0) {
      return users;
    };

    return undefined;
  };

  /** Récupère un User par son email */
  async findOneByEmail(email: string): Promise<User> {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      return user;
    };

    return undefined;
  };

  /** Récupère un User par son Id */
  async findOneById(id: number): Promise<User> {
    const user = await User.findOneBy({ id });

    if (user) {
      return user;
    };

    return undefined;
  };


  /** Supprime la commande d'un User */
  async removeFromCart(user: User, productId: number): Promise<User> {

    // Crée une nouvelle commande sans le produit à supprimer
    const newProductList = user.carts.map(product => {
      if (product.id !== productId) {
        return newProductList;
      };
    });

    // Remplace le tableau de commande par le nouveau tableau 
    user.carts = newProductList;

    user.save();

    return user;
  };
 

  async update(id: number, updateUserDto: UpdateUserDto) {

    const userUpdate = await User.findOneBy({ id });
    userUpdate.firstname = updateUserDto.firstname;
    userUpdate.lastname = updateUserDto.lastname;
    userUpdate.email = updateUserDto.email;
    userUpdate.password = updateUserDto.password;

    const user = await userUpdate.save();

    if (updateUserDto) {
      return user;
    }
    return undefined;

  }

  /** Supprime un User */
  async remove(id: number): Promise<User | undefined> {

    // Vérifie que le User à supprimer existe
    const isUserExists = await User.findOneBy({ id });

    if (!isUserExists) {
      throw new NotFoundException('User id inexistant');
    };

    await isUserExists.remove();

    if (isUserExists) {
      return isUserExists;
    };

    return undefined;
  };

}
