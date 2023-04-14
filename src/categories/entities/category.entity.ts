import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
   /*  @OneToMany(() => Product, (product) => product.category)
    products: Product[];
     */
}
