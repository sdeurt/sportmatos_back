import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Order } from "src/order/entities/order.entity";
import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity('users')
export class User extends BaseEntity {

    //colonnes
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ type: 'varchar' })
    firstname: string;

    @ApiProperty()
    @Column({ type: 'varchar' })
    lastname: string;


    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Exclude() // permet d'exclure une colonne du retour de données en ajoutant un interceptor sur les routes concernées
    @Column({ nullable: false })
    password: string;

    @ApiProperty()
    @Column({ type: 'boolean', default: false })
    admin: boolean;

    //relations
    @ApiProperty({ type: () => [Order] })
    @OneToMany(() => Order, (order) => order.user, {cascade: true })
    @JoinTable()
    orders: Order[];

/**cascade pour permettre les opérations de cascade, telles que la suppression des commandes (Order) associées lorsqu'un utilisateur (User) est supprimé.
 *   cascade: true: les commandes associées seront automatiquement supprimées lorsque l'utilisateur est supprimé */
}
