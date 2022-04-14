import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @ContextUser() contextUser: IContextUser,
  ) {
    this.pointTransactionService.create({ impUid, amount, contextUser });
  }
}
