import { Board } from 'src/apis/board/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @ManyToOne(() => Board)
    board: Board;
}
