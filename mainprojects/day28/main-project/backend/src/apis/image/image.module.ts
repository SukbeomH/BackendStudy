import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { Product } from '../product/entities/product.entity';
import { Image } from './entities/image.entity';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Image])],
    providers: [ImageResolver, ImageService, FileService],
})
export class ImageModule {}
