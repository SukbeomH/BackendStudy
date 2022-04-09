import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Deal } from 'src/apis/deal/entities/deal.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { DealComment } from '../entities/dealComment.entity';

@InputType()
export class CreateDealCommentInput extends OmitType(
    DealComment,
    ['id'],
    InputType,
) {
    @Field(() => Deal)
    dealId: string;

    @Field(() => User)
    userId: string;
}
