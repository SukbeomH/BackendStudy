import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Purchase } from 'src/apis/purchase/entities/purchase.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => Purchase, (purchase) => purchase.products)
    purchase: Purchase[];
}
