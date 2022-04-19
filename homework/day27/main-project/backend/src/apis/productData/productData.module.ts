import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { ProductData } from './entities/productData.entity';
import { ProductDataResolver } from './productData.resolver';
import { ProductDataService } from './productData.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, ProductData])],
    providers: [ProductDataResolver, ProductDataService],
})
export class ProductDataModule {}
