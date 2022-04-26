import { Module } from '@nestjs/common';
import { StarbucksService } from './starbucks.service';
import { StarbucksResolver } from './starbucks.resolver';

@Module({
    providers: [StarbucksService, StarbucksResolver],
})
export class StarbucksModule {}
