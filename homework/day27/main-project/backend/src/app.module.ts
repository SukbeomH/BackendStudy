import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { BoardImageModule } from './apis/boardImage/boardImage.module';
import { CartModule } from './apis/cart/cart.module';
import { CategoryModule } from './apis/category/category.module';
import { CommentModule } from './apis/comment/comment.module';
import { DealCommentModule } from './apis/dealComment/dealComment.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ProductModule } from './apis/product/product.module';
import { UserModule } from './apis/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FileModule } from './apis/file/file.module';
import { ProductDataModule } from './apis/productData/productData.module';

@Module({
    imports: [
        AuthModule,
        BoardModule,
        BoardImageModule,
        CartModule,
        CategoryModule,
        CommentModule,
        DealCommentModule,
        FileModule,
        PointTransactionModule,
        ProductModule,
        ProductDataModule,
        UserModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'my-database',
            // host: 'localhost',
            port: 3306,
            username: 'root',
            password: process.env.MYSQL_PSWD,
            database: 'myDocker',
            // database: 'localhost',
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
            retryDelay: 5000,
            retryAttempts: 15,
        }),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}
