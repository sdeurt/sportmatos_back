import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('cart-item')
export class CartItem extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;


    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart: Cart;

    @ManyToOne(() => Product, (product) => product.cartItems, { eager: true })
    product: Product;
}
