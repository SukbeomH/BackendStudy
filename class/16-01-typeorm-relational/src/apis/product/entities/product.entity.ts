import { ProductSalesLocation } from 'src/apis/productSalesLocation/entities/productSalesLocation.entity';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productTag/entities/productTag.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    isSoldout: boolean;

    @JoinColumn()
    @OneToOne(() => ProductSalesLocation)
    productSalesLocation: ProductSalesLocation;

    // user 연결
    @ManyToOne(() => User)
    user: User;

    // 카테고리 연결
    @ManyToOne(() => ProductCategory)
    productCategory: ProductCategory;

    @JoinTable()
    @ManyToMany(() => ProductTag, (productTag) => productTag.products)
    productTags: ProductTag[];
}
