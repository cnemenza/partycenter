enum PRODUCT_TYPES {
  SIMPLE = 'Simple',
  PACKAGE = 'Package'
}

const __dictionaryProductTypes = {
  [PRODUCT_TYPES.SIMPLE]: {
    value: PRODUCT_TYPES.SIMPLE,
    label: PRODUCT_TYPES.SIMPLE
  },
  [PRODUCT_TYPES.PACKAGE]: {
    value: PRODUCT_TYPES.PACKAGE,
    label: PRODUCT_TYPES.PACKAGE
  }
};

const __arrayProductTypes = [
  __dictionaryProductTypes[PRODUCT_TYPES.SIMPLE],
  __dictionaryProductTypes[PRODUCT_TYPES.PACKAGE]
];

export default Object.freeze({
  ProductTypes: {
    VALUES: PRODUCT_TYPES,
    __dictionray: __dictionaryProductTypes,
    __array: __arrayProductTypes
  }
});
