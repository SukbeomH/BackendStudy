import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Drink } from './entities/starbucks.entity';
import { StarbucksService } from './starbucks.service';
import { DrinkInput } from './dto/starbucks.input';

@Resolver()
export class StarbucksResolver {
    constructor(private readonly starbucksService: StarbucksService) {}
    @Query(() => [Drink])
    fetchStarbucks(): Drink[] {
        return this.starbucksService.findAll();
    }

    @Mutation(() => String)
    createStarbucks(@Args('DrinkInput') DrinkInput: DrinkInput): string {
        console.log(DrinkInput);
        return this.starbucksService.createOne(DrinkInput);
    }
}
