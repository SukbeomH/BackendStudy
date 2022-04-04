import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
    imports: [
        BoardModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            // host: 'my-database',
            host: 'localhost',
            port: 3306,
            retryDelay: 5000,
            retryAttempts: 20,
            username: 'root',
            password: 'root',
            database: 'class',
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
    // controllers: [AppController],
    // providers: [AppService],
})
export class AppModule {}
