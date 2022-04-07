import { InputType, OmitType } from '@nestjs/graphql';
import { ProductData } from '../entities/productData.entity';

@InputType()
export class ProductDataInput extends OmitType(
    ProductData,
    ['id'],
    InputType,
) {}
