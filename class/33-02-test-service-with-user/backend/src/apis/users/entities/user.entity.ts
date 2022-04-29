import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) // 비밀번호 유출금지
  password: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ default: 0 })
  @Field(() => Int, { defaultValue: 0 })
  point: number;

  @Column()
  @Field(() => Int)
  age: number;
}
