import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';

@Entity()
export class ProductData {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    image: string;

    @ManyToOne(() => Product)
    product: Product;
}
