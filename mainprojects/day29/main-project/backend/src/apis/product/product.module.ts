import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../cart/entities/cart.entity';
import { IamportService } from '../imaport/iamport.service';
import { Image } from '../image/entities/image.entity';
import { User } from '../user/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductSubscriber } from './entities/product.subscriber';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, Product, User, Image])],
    providers: [
        ProductResolver,
        ProductService,
        IamportService,
        ProductSubscriber,
    ],
})
export class ProductModule {}
