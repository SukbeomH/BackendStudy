import { ObjectType, Field } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    content: string;

    @ManyToOne(() => Board)
    @Field(() => Board)
    board: Board;
}
