import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    providers: [BoardResolver, BoardService],
})
export class BoardModule {}
