import { Module } from '@nestjs/common';
import { StarbucksModule } from './apis/starbucks/starbucks.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Drink } from './apis/starbucks/entities/starbucks.entity';

@Module({
    imports: [
        StarbucksModule,
        TypeOrmModule.forRoot({
            type: 'mysql', //데이터 베이스 타입
            host: 'localhost', //local 환경으로 진행
            port: 3306, //mysql은 기본 port는 3306
            username: 'root', //mysql은 기본 user는 root로 지정
            password: 'root', //설치 과정에서 설정한 비밀번호
            database: 'starbucks',
            entities: [Drink], //데이터 베이스와 연결할 entity
            synchronize: true,
            logging: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/common/graphql/schema.gql',
        }),
    ],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
