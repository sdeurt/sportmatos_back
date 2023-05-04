import { ApiProperty } from "@nestjs/swagger";
import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('cart')
export class Cart extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0
    })
    totalPrice: number;

    /** "en cours" "traité" "finalisé"  */
    @ApiProperty()
    @Column({default: "en cours"})
    status: string; 

        
    @ApiProperty()
    @CreateDateColumn({ type: "timestamptz" })
    date: Date;

    @ApiProperty()
    @ManyToOne(() => User, (user) => user.carts, { eager: true })
    user: User;

    @ApiProperty()
    @OneToMany(() => CartItem, (cartItems) => cartItems.cart, { eager: true })
    cartItems: CartItem[];


}
