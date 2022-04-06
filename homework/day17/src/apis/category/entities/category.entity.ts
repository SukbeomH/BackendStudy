import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn('increment')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    name: string;
}
