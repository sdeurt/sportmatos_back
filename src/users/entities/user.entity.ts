import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { UserRoleEnum } from "src/auth/enum/user-role.enum";
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
     @Column({ 
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER })
    @Exclude()
    role: UserRoleEnum; 

    //relations
    @ApiProperty({ type: () => [Order] })
    @OneToMany(() => Order, (order) => order.id, { cascade: true })
    @JoinTable()
    orders: Order[];

}
