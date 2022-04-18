import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
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
    // 쿼리 러너 사용을 위해서 커넥션을 임포트
    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, contextUser }) {
    // 쿼리 러너를 사용
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    // Transaction 시작 (쿼리러너를 통해서)
    await queryRunner.startTransaction();

    try {
      // 거래기록 생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid,
        amount,
        user: contextUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      // await this.pointTransactionRepository.save(pointTransaction);
      // 쿼리러너로 저장
      await queryRunner.manager.save(pointTransaction);

      // throw new Error('쿼리러너 에러 테스트!!');

      // 유저의 포인트 확인
      const user = await this.userRepository.findOne({ id: contextUser.id });
      // // 유저의 포인트 업데이트 (충전한 포인트 더해주기)
      // await this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );

      // 쿼리러너로 포인트 저장하기 위해 저장 방식 변경 (생성 후 덮어쓰기)
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser); // await this.userRepository.save(updatedUser)

      // 성공 확정! ( = Commit )
      await queryRunner.commitTransaction();

      // 최종결과를 프론트에 반환
      return pointTransaction;
    } catch (error) {
      // 만약 중간에 한 과정이라도 실패했다면 RollBack!!
      await queryRunner.rollbackTransaction();
    } finally {
      // 최종적으로 쿼리러너와의 연결을 해제한다(성공여부와 관계없이)
      await queryRunner.release();
    }
  }
}
// 쿼리러너를 매번 연결하고 해제 해줘야 하는 이유
// DB와 연결가능한 갯수는 한정되어있으므로,
// 연결을 끊어주지 않으면 끝없이 연결만 되다가
// 갯수 제한을 넘기고 종료되어 버린다.
