import { Order } from "src/order/entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class OrderItem extends BaseEntity {
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

/*   @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;
     */
}
