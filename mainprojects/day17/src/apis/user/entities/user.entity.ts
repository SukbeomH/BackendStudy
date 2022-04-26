import { Int, ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    kakao: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => Int)
    auth: number;

    @Column()
    @Field(() => String)
    date: string;

    @Column()
    @Field(() => Boolean)
    admin: boolean;
}
