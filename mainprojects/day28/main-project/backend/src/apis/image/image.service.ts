import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
    constructor(
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly connection: Connection,
    ) {}

    // 상품데이터 생성
    async create({ productId ,boardId, images }) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const results = [];
            images.forEach(async (element: string) => {
                // 상품데이터 생성
                const image = this.imageRepository.create({
                    product: productId ? productId : "none",
                    board: boardId ? boardId : "none",
                    image: element,
                });
                await queryRunner.manager.save(image);
                results.push(image);
            });
            // 데이터 변경을 확정하고 생성 결과를 프론트에 반환
            await queryRunner.commitTransaction();
            return results;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
        } finally {
            await queryRunner.release();
        }
    }

    // 상품 데이터 업데이트
    async update({ productId, boardId, images }) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 기존 상품데이터 삭제
            await queryRunner.manager.delete(Image, {
                product: productId,
            });
            // 덮어쓰기
            const results = [];
            images.forEach(async (element: string) => {
                // 상품데이터 생성
                const image = this.imageRepository.create({
                    product: productId ? productId : "none",
                    board: boardId ? boardId : "none",
                    image: element,
                });
                await queryRunner.manager.save(image);
            });
            await queryRunner.commitTransaction();
            return results;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
        } finally {
            await queryRunner.release();
        }
    }
}
