import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { BoardImage } from './entities/boardImage.entity';

@Injectable()
export class BoardImageService {
    constructor(
        @InjectRepository(BoardImage)
        private readonly boardImageRepository: Repository<BoardImage>,

        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async findAll() {
        return await this.boardImageRepository.find({
            relations: ['board'],
        });
    }

    async findOne({ boardImageId }) {
        const boardImage = await this.boardImageRepository.findOne({
            id: boardImageId,
        });
        if (!boardImage)
            throw new ConflictException('검색하려는 파일이 존재하지 않습니다');

        return await this.boardImageRepository.findOne({
            where: { id: boardImageId },
            relations: ['board'],
        });
    }

    async create({ createBoardImageInput }) {
        const { boardId, ...boardImage } = createBoardImageInput;

        const result1 = await this.boardRepository.findOne({
            id: boardId,
        });
        const result2 = await this.boardImageRepository.save({
            ...boardImage,
            boardId: result1,
        });
        return result2;
    }

    async delete({ boardImageId }) {
        const boardImage = await this.boardImageRepository.findOne({
            id: boardImageId,
        });
        if (!boardImage)
            throw new ConflictException('삭제하려는 파일이 존재하지 않습니다');

        const result = await this.boardImageRepository.delete({
            id: boardImageId,
        });
        return result.affected ? true : false;
    }
}
