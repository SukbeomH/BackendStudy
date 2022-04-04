import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    price: number;

    @Column()
    count: number;

    @Column()
    date: string;

    @ManyToMany(() => Product, (product) => product.purchase)
    products: Product[];
}
