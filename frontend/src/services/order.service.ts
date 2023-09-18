import { GeneralsConstants } from '@/constants';
import { createUrlSearchParams } from '@/utils/url.util';
import api from './_api';

const BASE_URL = `/orders`;

interface Order {
  createdAt?: Date;
  createdBy?: string;
  id: string;
  code: string;
  eventAddress: string;
  eventDate: Date;
  type: string;
  deliveryId: string;
  clientId: string;
  client: Client;
  observations: string;
  withTax: boolean;
  orderPayment: OrderPayment;
  orderDetails: OrderDetail[];
  subTotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

interface OrderPayment {
  prepaid: number;
  balance: number;
  entityId: string;
  type: string;
}

interface OrderDetail {
  id?: string;
  productId: string;
  price: number;
  quantity?: number;
  product?: Product;
}

interface Product {
  id?: string;
  name: string;
}

interface Client {
  fullName: string;
}

interface OrderDataTableParamsValues {
  search?: string;
  dateStr?: string;
}

const getOrdersPagination = async (currentPage: number, paramsValues: OrderDataTableParamsValues) => {
  const params = createUrlSearchParams([
    { key: 'page', value: currentPage },
    { key: 'pageSize', value: GeneralsConstants.DATATABLE_PAGE_SIZE },
    { key: 'search', value: paramsValues.search },
    { key: 'date', value: paramsValues.dateStr }
  ]);

  return await api.get(BASE_URL, { params });
};

const getOrder = async (id: string) => await api.get<Order>(`${BASE_URL}/${id}`);

const createOrder = async (data: Order): Promise<Order> => await api.post(`${BASE_URL}`, data);

const updateOrder = async (id: string, data: Order): Promise<Order> => await api.put(`${BASE_URL}/${id}`, data);

const deleteOrder = async (id: string) => await api.delete(`${BASE_URL}/${id}`);

export {
  createOrder,
  deleteOrder,
  getOrder,
  getOrdersPagination,
  updateOrder,
  type Order,
  type OrderDataTableParamsValues,
  type OrderDetail,
  type OrderPayment
};
