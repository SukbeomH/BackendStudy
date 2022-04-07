import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductData } from '../productData/entities/productData.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductData])],
    providers: [ProductResolver, ProductService],
})
export class ProductModule {}
