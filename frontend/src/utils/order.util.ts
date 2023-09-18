import { GeneralsConstants } from '@/constants';
import { Order } from '@/services/order.service';
import { roundTwoDecimals } from '.';

const generatePayments = (order: Order) => {
  let subTotal = 0;
  let tax = 0;

  if (order.orderDetails) {
    order.orderDetails.forEach((value) => {
      const quantity = value?.quantity || 0;
      const price = value?.price ?? 0;

      subTotal += roundTwoDecimals(quantity * price);
    });
  }

  subTotal = roundTwoDecimals(subTotal);
  if (order.withTax) tax = roundTwoDecimals(subTotal * GeneralsConstants.TAX_PERCENTAGE);
  const shipping = roundTwoDecimals(order.shipping);
  const discount = roundTwoDecimals(order.discount);
  const total = roundTwoDecimals(subTotal + tax + shipping - discount);
  const prepaid = roundTwoDecimals(order.orderPayment.prepaid);
  const balance = roundTwoDecimals(total - prepaid);

  return {
    subTotal: subTotal,
    tax: tax,
    shipping: shipping,
    discount: discount,
    total: total,
    prepaid: prepaid,
    balance: balance
  };
};

export { generatePayments };
