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

    async fetchPaymentData({ impUid }) {
        // 발급되어 있는 아임포트 엑세스 토큰 가져오기
        const accessToken = await this.getToken();
        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            // imp_uid 전달
            url: `https://api.iamport.kr/payments/${impUid}`,
            method: 'get',
            // 인증 토큰 Authorization header에 추가
            headers: { Authorization: accessToken },
        });
        if (!getPaymentData)
            throw new UnprocessableEntityException('유효하지 않은 결제정보 🥵');
        // 조회한 결제 정보
        const paymentData = getPaymentData.data.response;
        return paymentData;
    }

    async validateOrder({ impUid, amount }) {
        const paymentData = await this.fetchPaymentData({ impUid });
        // 결제되어야 하는 금액
        const amountToBePaid = amount;
        if (paymentData.amount !== amountToBePaid)
            throw new UnprocessableEntityException(
                '오류: 결제금액 위조시도 👿',
            );
        // switch (paymentData.status) {
        //     가상계좌 발급
        //     case 'ready':
        //         // DB에 가상계좌 발급 정보 저장
        //         const { vbank_num, vbank_date, vbank_name } = paymentData;
        //         await Users.findByIdAndUpdate('/* 고객 id */', {
        //             $set: { vbank_num, vbank_date, vbank_name },
        //         });
        //         // 가상계좌 발급 안내 문자메시지 발송
        //         SMS.send({
        //             text: `가상계좌 발급이 성공되었습니다. 계좌 정보 ${vbank_num} ${vbank_date} ${vbank_name}`,
        //         });
        //         res.send({
        //             status: 'vbankIssued',
        //             message: '가상계좌 발급 성공',
        //         });
        //         break;
        //     결제 완료
        //     case 'paid':
        //         res.send({ status: 'success', message: '일반 결제 성공' });
        //         break;
        // }
        return true;
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
