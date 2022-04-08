import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Category } from 'src/apis/category/entities/category.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String, { nullable: true })
    title: string;

    @Column()
    @Field(() => String, { nullable: true })
    content: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    date: string;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Category)
    @Field(() => Category)
    category: Category;
}
