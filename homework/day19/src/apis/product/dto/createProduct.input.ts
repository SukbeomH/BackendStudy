import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductDataInput } from 'src/apis/productData/dto/productData.input';

@InputType()
export class CreateProductInput {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => Int, { nullable: true })
    price: number;

    @Field(() => String, { nullable: true })
    description: string;

    @Field(() => ProductDataInput)
    productData: ProductDataInput;
}
