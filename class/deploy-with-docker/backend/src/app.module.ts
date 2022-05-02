import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BoardModule } from './apis/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryModule } from './apis/productsCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { PaymentModule } from './apis/payment/payment.module';
import { FileModule } from './apis/file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    BoardModule,
    FileModule,
    PaymentModule,
    PointTransactionModule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.6.16.4',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gcp-class-sql',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
