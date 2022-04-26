import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ProductData {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    image: string;

    @ManyToOne(() => Product)
    @Field(() => Product)
    product: Product;
}
