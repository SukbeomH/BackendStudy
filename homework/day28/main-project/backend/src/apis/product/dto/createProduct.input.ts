import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateProductDataInput } from 'src/apis/productData/dto/createProductData.input';

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    price: number;

    @Field(() => String, { nullable: true })
    description: string;

    @Field(() => String)
    userId: string;

    @Field(() => [String])
    cart: string[];

    @Field(() => CreateProductDataInput)
    productData: CreateProductDataInput;
}
