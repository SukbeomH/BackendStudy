import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create({ email, password, kakao, auth }) {
        // 기존 데이터베이스에 이미 메일주소가 있는지 찾는다
        const user = await this.userRepository.findOne({ email });
        // 이미 등록된 메일이라면 에러를 뱉도록 한다
        if (user) throw new ConflictException('이미 등록된 메일입니다');
        return await this.userRepository.save({ email, password, kakao, auth });
    }
}
