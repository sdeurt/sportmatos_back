import { OrderItem } from "src/order-item/entities/order-item.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Order extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    totalPrice: number;
  
    @Column({ type: 'varchar' })
    adresse: string;
  
    @Column({ type: 'varchar' })
    status: string;
  
   /*  @ManyToOne(() => User, (user) => user.orders)
    user: User;
  
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems: OrderItem[]; */
}
