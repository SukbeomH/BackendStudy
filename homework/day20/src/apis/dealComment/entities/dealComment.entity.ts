import { ObjectType, Field } from '@nestjs/graphql';
import { Deal } from 'src/apis/deal/entities/deal.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class DealComment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    content: string;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Deal)
    @Field(() => Deal)
    deal: Deal;
}
