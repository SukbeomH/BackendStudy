import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BoardImage {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    image: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => Board, { onDelete: 'CASCADE' })
    @Field(() => Board)
    board: Board;
}
