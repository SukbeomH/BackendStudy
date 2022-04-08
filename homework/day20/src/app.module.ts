import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './apis/board/board.module';
import { ProductModule } from './apis/product/product.module';
import { UserModule } from './apis/user/user.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
    imports: [
        BoardModule,
        ProductModule,
        UserModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            // host: 'my-database',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            // database: 'myDocker',
            database: 'localhost',
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
