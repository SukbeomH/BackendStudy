import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Comment } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends OmitType(Comment, ['id'], InputType) {
    @Field(() => Board)
    boardId: string;

    @Field(() => User)
    userId: string;
}
