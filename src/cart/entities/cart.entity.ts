import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    quantity: number;
  
 /*    @ManyToOne(() => User, (user) => user.cartItems)
    user: User;
  
    @ManyToOne(() => Product, (product) => product.cartItems)
    product: Product; */
}
