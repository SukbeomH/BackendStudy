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

    async fetchOrder({ id }) {
        // 조회할 거래 찾기
        const purchase = await this.pointTransactionRepository.findOne({
            id,
        });
        const imp_uid = purchase.impUid;
        // 아임포트 ID가 존재하지 않을 경우 "UnprocessableEntityException"
        if (await this.pointTransactionRepository.findOne({ id: imp_uid }))
            throw new UnprocessableEntityException('유효하지 않은 결제 🥵');
        // 발급되어 있는 아임포트 엑세스 토큰 가져오기
        const access_token = await this.getToken();
        // imp_uid로 아임포트 서버에서 결제 정보 조회
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: 'get', // GET method
            headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
        });
        const paymentData = getPaymentData.data.response; // 조회한 결제 정보
        if (paymentData.imp_uid !== imp_uid)
            throw new UnprocessableEntityException('유효하지 않은 결제 🥵');
        return paymentData;
    }
}
