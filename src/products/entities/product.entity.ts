import { Category } from "src/categories/entities/category.entity";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    image: string;

    @Column()
    stock: number;

    @ManyToOne(() => Category, (category) => category.products,  { eager: true })
    category: Category;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];

}
