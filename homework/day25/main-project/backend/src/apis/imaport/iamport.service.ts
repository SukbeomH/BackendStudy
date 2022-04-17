import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PointTransaction } from '../pointTransaction/entities/pointTransaction.entity';
import { Resolver } from '@nestjs/graphql';

@Resolver()
@Injectable()
export class IamportService {
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointTransactionRepository: Repository<PointTransaction>,
    ) {}

    async getToken() {
        // 액세스 토큰(access token) 발급 받기
        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post', // POST method
            headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
            data: {
                imp_key: '6068291726739005', // REST API 키
                imp_secret:
                    'eb873648a37f320e7a3236c3d6fb4b3ba1e4a6aabd8fea406fb4327c6077606dffba6f2ee9ab1074', // REST API Secret
            },
        });
        const { access_token } = getToken.data.response; // 인증 토큰
        return access_token;
    }

    async fetchPaymentData({ accessToken, impUid }) {
        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            // imp_uid 전달
            url: `https://api.iamport.kr/payments/${impUid}`,
            method: 'get',
            // 인증 토큰 Authorization header에 추가
            headers: { Authorization: accessToken },
        });
        // 조회한 결제 정보
        const paymentData = getPaymentData.data.response;
        return paymentData;
    }

    async validateOrder({ accessToken, impUid, requestAmount }) {
        const paymentData = await this.fetchPaymentData({
            accessToken,
            impUid,
        });
        // 결제되어야 하는 금액
        const amountToBePaid = requestAmount;
        if (paymentData.amount !== amountToBePaid)
            throw new UnprocessableEntityException(
                '오류: 결제금액 위조시도 👿',
            );
        return paymentData.status;
    }

    async refund({ accessToken, impUid, cancelAmount, cancelableAmount }) {
        const getCancelData = await axios({
            url: 'https://api.iamport.kr/payments/cancel',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken,
            },
            data: {
                imp_uid: impUid,
                amount: cancelAmount,
                checksum: cancelableAmount,
            },
        });
        // 환불 결과
        const { response } = getCancelData.data;
        return response;
    }
}
