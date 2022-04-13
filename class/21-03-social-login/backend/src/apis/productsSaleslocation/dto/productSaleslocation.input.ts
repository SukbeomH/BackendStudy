import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
// PartialType: 가져오기
// OmitType: 빼고 가져올것 고르기
// PickType: 골라서 가져올것 고르기

// 위는 GraphQL, 타입스크립트의 경우 Utility Type.
