import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from '../purchase/entities/purchase.entity';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, User, Purchase])],
    providers: [ProductResolver, ProductService],
})
export class ProductModule {}
