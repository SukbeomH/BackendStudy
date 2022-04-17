import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IamportService } from '../imaport/iamport.service';
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
        private readonly iamportService: IamportService,
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

    async create({ impUid, requestAmount, contextUser }) {
        // 엑세스 토큰 새로 생성
        const accessToken = await this.iamportService.getToken();
        // 거래기록이 이미 존재하는지 확인
        const order = await this.pointTransactionRepository.findOne({ impUid });
        if (order) throw new ConflictException('이미 존재하는 결제 건입니다 🫢');
        // 거래기록 생성 && 내부 거래 id 생성
        const merchantUid = this.merchantUid();
        // 결제정보 저장
        const pointTransaction = await this.pointTransactionRepository.save({
            impUid,
            merchantUid: merchantUid,
            impToken: accessToken,
            requestAmount: requestAmount,
            user: contextUser,
            status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        });
        // 유저의 포인트 확인
        const user = await this.userRepository.findOne({
            id: contextUser.id,
        });
        // 유저의 포인트 업데이트 (충전한 포인트 더해주기)
        await this.userRepository.update(
            { id: user.id },
            { point: user.point + requestAmount },
        );
        // 최종결과를 프론트에 반환
        return pointTransaction;
    }

    async refund({ impUid, merchantUid, cancelAmount, contextUser }) {
        // 환불하려는 결제가 존재하는지 검증
        const order = await this.pointTransactionRepository.findOne({
            merchantUid,
        });
        if (!order)
            throw new ConflictException('존재하지 않는 결제 건입니다 🫢');
        // 이미 환불 되었는지 확인
        if (order.status === 'CANCEL')
            throw new ConflictException('이미 환불 된 결제 건입니다 🫢');
        // 환불 가능 금액( 유저의 잔액 - 환불 된 총 금액) 계산
        const user = await this.userRepository.findOne({
            id: contextUser.id,
        });
        const amount = user.point;
        const cancelableAmount = amount - cancelAmount;
        // 환불 가능한 금액보다 요구가 클 경우
        if (cancelableAmount < 0)
            throw new ConflictException(
                '🤔 보유하고 있는 포인트 보다 환불 금액이 클 수 없습니다!',
            );
        // 아임포트 엑세스 토큰 발급
        const accessToken = await this.iamportService.getToken();
        // 아임포트 측으로 환불요청 전송
        await this.iamportService.refund({
            accessToken,
            impUid,
            cancelAmount,
            cancelableAmount,
        });
        const pointTransaction = await this.pointTransactionRepository.save({
            impUid,
            merchantUid,
            impToken: accessToken,
            cancelAmount,
            user: contextUser,
            status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
        });
        // 유저의 포인트 업데이트 (충전한 포인트 더해주기)
        await this.userRepository.update(
            { id: user.id },
            { point: user.point - cancelAmount },
        );
        // 최종결과를 프론트에 반환
        return pointTransaction;
    }
}
