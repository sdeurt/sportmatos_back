import { OrderItem } from "src/order-item/entities/order-item.entity";
import { User } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('order')
export class Order extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        default: 0
    })
    totalPrice: number;

    @Column({ type: 'varchar' })
    adresse: string;

    @Column({ type: 'varchar' })
    status: string;

     @ManyToOne(() => User, (user) => user.orders, { eager: true })
     user: User;
   
     @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { eager: true })
     orderItems: OrderItem[]; 
}
