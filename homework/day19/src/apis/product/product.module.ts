import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, User])],
    providers: [ProductResolver, ProductService],
})
export class ProductModule {}
