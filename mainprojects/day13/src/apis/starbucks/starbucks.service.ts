import { Injectable } from '@nestjs/common';
import { Drink } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
    findAll(): Drink[] {
        return [
            {
                name: '아메리카노',
                price: '₩5000',
                kcal: '1kcal',
                fat: '1g',
                protein: '1g',
                sodium: '1g',
                sugar: '1g',
                caffeine: '100mg',
            },
        ];
    }

    createOne(args): string {
        console.log('입력값들: ', args);
        return '커피등록됨';
    }
}
