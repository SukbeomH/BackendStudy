import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    kakao: string;

    @Column()
    phone: string;

    @Column()
    auth: number;

    @Column()
    date: string;

    @Column()
    admin: boolean;
}
