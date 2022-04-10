import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardImageInput {
    @Field(() => String)
    image: string;

    @Field(() => String)
    boardId: string;
}
