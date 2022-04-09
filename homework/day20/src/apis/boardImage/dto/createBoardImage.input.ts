import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { BoardImage } from '../entities/boardImage.entity';

@InputType()
export class CreateBoardImageInput extends OmitType(
    BoardImage,
    ['id'],
    InputType,
) {
    @Field(() => Board)
    boardId: string;
}
