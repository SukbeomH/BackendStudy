import { Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { ContextUser, IContextUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthEmailGuard } from 'src/commons/auth/graphql-auth.guard';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
    constructor(
        private readonly pointTransactionService: PointTransactionService,
    ) {}
    @UseGuards(GqlAuthEmailGuard)
    @Mutation(() => PointTransaction)
    createPointTransaction(
        @Req() req: Request,
        @Args('impUid') impUid: string,
        @Args('merchantUid') merchantUid: string,
        @Args('amount') amount: number,
        @ContextUser() contextUser: IContextUser,
    ) {
        return this.pointTransactionService.create({
            impUid,
            merchantUid,
            amount,
            contextUser,
        });
    }

    @UseGuards(GqlAuthEmailGuard)
    @Mutation(() => PointTransaction)
    refundPointTransaction(
        @Req() req: Request,
        @Args('impUid') impUid: string,
        @Args('merchantUid') merchantUid: string,
        @Args('cancelAmount') cancelAmount: number,
        @ContextUser() contextUser: IContextUser,
    ) {
        return this.pointTransactionService.refund({
            impUid,
            merchantUid,
            cancelAmount,
            contextUser,
        });
    }
}
