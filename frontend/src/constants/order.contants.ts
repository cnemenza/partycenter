enum ORDER_TYPES {
  INTERNAL = 'Internal',
  WEB = 'Web'
}

enum ORDER_PAYMENT_TYPES {
  MANUAL = 'Manual',
  PAYPAL = 'Paypal'
}

export default Object.freeze({
  OrderTypes: {
    VALUES: ORDER_TYPES
  },
  OrderPaymentTypes: {
    VALUES: ORDER_PAYMENT_TYPES
  }
});
