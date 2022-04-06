import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { User } from 'src/apis/user/entities/user.entity';
import { Purchase } from 'src/apis/purchase/entities/purchase.entity';
import { Int, ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String, { nullable: true })
    name: string;

    @Column()
    @Field(() => Int, { nullable: true })
    price: number;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    description: string;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @JoinTable()
    @ManyToMany(() => Purchase, (purchase) => purchase.products)
    @Field(() => [Purchase])
    purchase: Purchase[];
}
