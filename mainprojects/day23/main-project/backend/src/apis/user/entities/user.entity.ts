import { Int, ObjectType, Field } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    UpdateDateColumn,
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

    @Column({default:"none"})
    @Field(() => String,{defaultValue:"none"})
    snsId: string;

    @Column({default:"self"})
    @Field(() => String,{defaultValue: "self"})
    provider: string;

    @Column()
    @Field(() => Int)
    auth: number;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column({ default: 0 })
    @Field(() => Boolean, { defaultValue: 0 })
    admin: boolean;
}
