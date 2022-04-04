import { Board } from 'src/apis/board/entities/board.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoardImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    image: string;

    @ManyToOne(() => Board)
    board: Board;
}
