import { GeneralsConstants } from '@/constants';
import { createUrlSearchParams } from '@/utils/url.util';
import api from './_api';

const BASE_URL = `/deliveries`;

interface ParamsValues {
  search: string;
}

interface Delivery {
  id: string;
  price: number;
  description: string;
}

const getDeliveriesPagination = async (currentPage: number, paramsValues: ParamsValues) => {
  const params = createUrlSearchParams([
    { key: 'page', value: currentPage },
    { key: 'pageSize', value: GeneralsConstants.DATATABLE_PAGE_SIZE },
    { key: 'search', value: paramsValues.search }
  ]);

  return await api.get(BASE_URL, { params });
};

const getDelivery = async (id: string) => await api.get<Delivery>(`${BASE_URL}/${id}`);

const createDelivery = async (data: Delivery) => await api.post(`${BASE_URL}`, data);

const updateDelivery = async (id: string, data: Delivery) => await api.put(`${BASE_URL}/${id}`, data);

const deleteDelivery = async (id: string) => await api.delete(`${BASE_URL}/${id}`);

const getDeliveries = async () => await api.get<Delivery[]>(`${BASE_URL}/all`);

export {
  createDelivery,
  deleteDelivery,
  getDeliveries,
  getDeliveriesPagination,
  getDelivery,
  updateDelivery,
  type Delivery
};
