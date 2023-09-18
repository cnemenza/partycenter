import { GeneralsConstants } from '@/constants';
import { createUrlSearchParams } from '@/utils/url.util';
import api from './_api';

const BASE_URL = `/products`;

interface ParamsValues {
  search: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  code: string;
  enabled: boolean;
  totalStock: number;
  price: number;
  type: string;
  categoryId: string;
}

const getProductsPagination = async (currentPage: number, paramsValues: ParamsValues) => {
  const params = createUrlSearchParams([
    { key: 'page', value: currentPage },
    { key: 'pageSize', value: GeneralsConstants.DATATABLE_PAGE_SIZE },
    { key: 'search', value: paramsValues.search }
  ]);

  return await api.get(BASE_URL, { params });
};

const getProduct = async (id: string) => await api.get<Product>(`${BASE_URL}/${id}`);

const createProduct = async (data: Product) => await api.post(`${BASE_URL}`, data);

const updateProduct = async (id: string, data: Product) => await api.put(`${BASE_URL}/${id}`, data);

const deleteProduct = async (id: string) => await api.delete(`${BASE_URL}/${id}`);

export { createProduct, deleteProduct, getProduct, getProductsPagination, updateProduct, type Product };
