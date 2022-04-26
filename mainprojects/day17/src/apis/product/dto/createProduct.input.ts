import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    price: number;

    @Field(() => String, { nullable: true })
    description: string;
}
