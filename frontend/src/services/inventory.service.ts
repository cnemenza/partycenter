import { createUrlSearchParams, dateToString } from '@/utils';
import api from './_api';

const BASE_URL = `/products-inventory`;

interface ProductStock {
  id: string;
  code: string;
  name: string;
  totalStock: number;
  availableStock: number;
  price: number;
  category?: string;
}

const getProductsStock = async (date: Date, orderId?: string) => {
  const dateStr = dateToString(date);
  const params = createUrlSearchParams([
    { key: 'date', value: dateStr },
    { key: 'orderId', value: orderId }
  ]);

  return await api.get<ProductStock[]>(`${BASE_URL}/stock`, { params });
};

export { getProductsStock, type ProductStock };
