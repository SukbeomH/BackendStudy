import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {}

    async findAll() {
        return await this.boardRepository.find();
    }

    async findOne({ boardId }) {
        return await this.boardRepository.findOne({
            where: { id: boardId },
        });
    }

    async create({ createBoardInput }) {
        // 카테고리를 데이터베이스에 저장
        const result = await this.boardRepository.save({
            ...createBoardInput,
        });
        return result;
    }

    async update({ boardId, updateBoardInput }) {
        const board = await this.boardRepository.findOne({
            where: { id: boardId },
        });
        const newBoard = { ...board, ...updateBoardInput };

        return await this.boardRepository.save(newBoard);
    }
}
