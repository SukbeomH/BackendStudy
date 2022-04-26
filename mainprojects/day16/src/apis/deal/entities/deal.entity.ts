import { Category } from 'src/apis/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    site: string;

    @Column()
    shop: string;

    @Column()
    isEnd: boolean;

    @Column()
    time: string;

    @Column()
    image: string;

    @ManyToOne(() => Category)
    category: Category;
}
