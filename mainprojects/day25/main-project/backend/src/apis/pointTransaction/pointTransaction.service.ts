import { ConflictException, Injectable } from '@nestjs/common';
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

    // 내부 거래 id 생성
    merchantUid() {
        const date = new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        const r = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
        const UUID = `ORD${yyyy}${mm}${dd}-${h}${m}${s}-${r}`;
        return UUID;
    }

    async checkDuplicate({ impUid }) {
        // 거래기록이 이미 존재하는지 확인
        const order = await this.pointTransactionRepository.findOne({ impUid });
        if (order) throw new ConflictException('이미 존재하는 결제 건입니다 🫢');
    }

    async create({
        impUid,
        amount,
        contextUser,
        status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    }) {
        // 결제정보 저장
        const pointTransaction = this.pointTransactionRepository.create({
            impUid,
            amount,
            user: contextUser,
            status,
        });
        await this.pointTransactionRepository.save(pointTransaction);
        // 유저의 포인트 확인
        const user = await this.userRepository.findOne({
            id: contextUser.id,
        });
        // 유저의 포인트 업데이트 (충전한 포인트 더해주기)
        await this.userRepository.update(
            { id: user.id },
            { point: user.point + amount },
        );
        // 최종결과를 프론트에 반환
        return pointTransaction;
    }

    // 이미 환불 되었는지 확인
    async checkAlreadyCanceled({ impUid }) {
        const order = await this.pointTransactionRepository.findOne({
            impUid,
            status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
        });
        if (order) throw new ConflictException('이미 환불 된 결제 건입니다 🫢');
    }

    // 환불하려는 결제가 존재하는지 검증
    async checkHasCancelablePoint({ impUid, contextUser }) {
        const order = await this.pointTransactionRepository.findOne({
            impUid,
            status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            user: { id: contextUser.id },
        });
        if (!order)
            throw new ConflictException('존재하지 않는 결제 건입니다 🫢');
        // 환불 가능 금액( 유저의 잔액 - 환불 된 총 금액) 계산
        const user = await this.userRepository.findOne({
            id: contextUser.id,
        });
        const amount = user.point;
        const cancelableAmount = amount - order.amount;
        // 환불 가능한 금액보다 요구가 클 경우
        if (cancelableAmount < 0)
            throw new ConflictException(
                '🤔 보유하고 있는 포인트 보다 환불 금액이 클 수 없습니다!',
            );
    }
    async cancel({ impUid, amount, contextUser }) {
        const pointTransaction = await this.create({
            impUid,
            amount: -amount,
            contextUser,
            status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
        });
        return pointTransaction;
    }
}
