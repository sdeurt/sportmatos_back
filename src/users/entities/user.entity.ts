import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity('users')
//@Unique('email') rend les paramètres unique
export class User extends BaseEntity {

    //colonnes
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    firtname: string;

    @Column({ type: 'varchar' })
    lastname: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    @Exclude() // permet d'exclure une colonne du retour de 
    password: string;

    @Column({ type: 'boolean', default: false })
    admin: boolean;

    //relations
    //@ApiProperty({ type: () => [Order] })
  /*  @OneToMany(() => Order, (order) => order.user, { cascade: true })
    @Jointable()
    orders: Order[];
*/
}
