import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/apis/product/entities/product.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class ProductData {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    image: string;

    @ManyToOne(() => Product, { onDelete: 'CASCADE' })
    @Field(() => Product)
    product: Product;
}
