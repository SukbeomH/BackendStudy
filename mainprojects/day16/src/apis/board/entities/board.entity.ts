import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Category } from 'src/apis/category/entities/category.entity';

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    date: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Category)
    category: Category;
}
