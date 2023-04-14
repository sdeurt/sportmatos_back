import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('cart')
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
