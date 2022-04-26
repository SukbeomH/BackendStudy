import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import {
    PointTransaction,
    POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointTransactionRepository: Repository<PointTransaction>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create({ impUid, amount, contextUser }) {
        // 거래기록 생성
        const pointTransaction = await this.pointTransactionRepository.save({
            impUid,
            amount,
            user: contextUser,
            status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        });
        // 유저의 포인트 확인
        const user = await this.userRepository.findOne({ id: contextUser.id });
        // 유저의 포인트 업데이트 (충전한 포인트 더해주기)
        await this.userRepository.update(
            { id: user.id },
            { point: user.point + amount },
        );
        // 최종결과를 프론트에 반환
        return pointTransaction;
    }
}
