import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Drink {
    @PrimaryGeneratedColumn('increment')
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    price: string;

    @Column()
    @Field(() => String)
    kcal: string;

    @Column()
    @Field(() => String)
    fat: string;

    @Column()
    @Field(() => String)
    protein: string;

    @Column()
    @Field(() => String)
    sodium: string;

    @Column()
    @Field(() => String)
    sugar: string;

    @Column()
    @Field(() => String)
    caffeine: string;
}
