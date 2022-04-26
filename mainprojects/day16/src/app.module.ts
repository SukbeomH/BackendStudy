import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'my-database',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'myDocker',
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
            retryDelay: 5000,
            retryAttempts: 15,
        }),
    ],
    // controllers: [AppController],
    // providers: [AppService],
})
export class AppModule {}
