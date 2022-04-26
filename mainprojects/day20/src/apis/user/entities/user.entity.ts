import { Int, ObjectType, Field } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

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
    // @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    kakao: string;

    @Column()
    @Field(() => Int)
    auth: number;

    @CreateDateColumn()
    createAt: Date;

    @Column({ default: 0 })
    @Field(() => Boolean, { defaultValue: 0 })
    admin: boolean;
}
