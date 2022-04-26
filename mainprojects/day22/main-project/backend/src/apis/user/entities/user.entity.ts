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
    @Field(() => String)
    password: string;

    @Column()
    @Field(() => String)
    kakao: string;

    @Column()
    @Field(() => Int)
    auth: number;

    @CreateDateColumn({ nullable: true })
    createAt: Date;

    @Column({ default: 0, nullable: true })
    @Field(() => Boolean, { defaultValue: 0, nullable: true })
    admin: boolean;
}
