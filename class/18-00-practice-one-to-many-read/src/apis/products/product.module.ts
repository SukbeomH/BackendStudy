import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductCategory } from '../productsCategory/entities/productCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductCategory]),
  ],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
