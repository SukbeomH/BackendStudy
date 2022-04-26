import { Int, ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    email: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    password: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    kakao: string;

    @Column({ nullable: true })
    @Field(() => Int, { nullable: true })
    auth: number;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    date: string;

    @Column({ nullable: true })
    @Field(() => Boolean, { nullable: true })
    admin: boolean;
}
