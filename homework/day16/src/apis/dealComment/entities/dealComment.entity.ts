import { Deal } from 'src/apis/deal/entities/deal.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DealComment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Deal)
    deal: Deal;
}
