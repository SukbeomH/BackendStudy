import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { IamportService } from '../imaport/iamport.service';
import { ProductData } from '../productData/entities/productData.entity';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, Product, User, ProductData])],
    providers: [ProductResolver, ProductService, IamportService],
})
export class ProductModule {}
