import { Category } from "src/categories/entities/category.entity";
import { BaseEntity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



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
  
  /*   @ManyToOne(() => Category, (category) => category.products)
    category: Category;
  
    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];
   */
}
