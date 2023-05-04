import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { Category } from "src/categories/entities/category.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0
    })
    price: number;

    @Column()
    image: string;

    @Column()
    stock: number;

    @ManyToOne(() => Category, (category) => category.products,  { eager: true })
    category: Category;

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[];

}
