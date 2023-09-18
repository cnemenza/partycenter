import { OrderDetailDTO } from '../order-detail/order-detail.dto';

export class OrderAmountDTO {
  withTax: boolean;
  shipping: number;
  discount: number;
  prepaid: number;
  orderDetails: OrderDetailDTO[];
}
