import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
    @Field(() => String, { nullable: true })
    email: string;

    @Field(() => String, { nullable: true })
    password: string;

    @Field(() => String, { nullable: true })
    kakao: string;

    @Field(() => String, { nullable: true })
    phone: string;

    @Field(() => Int, { nullable: true })
    auth: number;

    @Field(() => String, { nullable: true })
    date: string;

    @Field(() => Boolean, { nullable: true })
    admin: boolean;
}
