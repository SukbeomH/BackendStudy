import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDataInput {
    @Field(() => String, { nullable: true })
    image: string;
}
