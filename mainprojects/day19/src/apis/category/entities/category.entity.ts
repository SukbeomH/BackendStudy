import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
    @PrimaryGeneratedColumn()
    @Field(() => String)
    name: string;
}
