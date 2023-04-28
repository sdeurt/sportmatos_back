import { Order } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('order-item')
export class OrderItem extends BaseEntity {
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    default: 0
})
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems,{ eager: true })
  product: Product;
     
}
//eager: true, les relations order et product seront automatiquement chargées lorsque vous récupérez une entité OrderItem de la base de données