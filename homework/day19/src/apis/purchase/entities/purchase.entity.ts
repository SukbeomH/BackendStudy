import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';
import { Int, ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Purchase {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => Int)
    price: number;

    @Column()
    @Field(() => Int)
    count: number;

    @Column()
    @Field(() => String)
    date: string;

    @ManyToMany(() => Product, (product) => product.purchase)
    @Field(() => [Product])
    products: Product[];
}
