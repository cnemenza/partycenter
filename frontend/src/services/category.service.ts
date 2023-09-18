import { GeneralsConstants } from '@/constants';
import { createUrlSearchParams } from '@/utils/url.util';
import api from './_api';

const BASE_URL = `/categories`;

interface ParamsValues {
  search: string;
}

interface Category {
  id: string;
  name: string;
}

const getCategoriesPagination = async (currentPage: number, paramsValues: ParamsValues) => {
  const params = createUrlSearchParams([
    { key: 'page', value: currentPage },
    { key: 'pageSize', value: GeneralsConstants.DATATABLE_PAGE_SIZE },
    { key: 'search', value: paramsValues.search }
  ]);

  return await api.get(BASE_URL, { params });
};

const getCategory = async (id: string) => await api.get<Category>(`${BASE_URL}/${id}`);

const createCategory = async (data: Category) => await api.post(`${BASE_URL}`, data);

const updateCategory = async (id: string, data: Category) => await api.put(`${BASE_URL}/${id}`, data);

const deleteCategory = async (id: string) => await api.delete(`${BASE_URL}/${id}`);

const getCategories = async () => await api.get<Category[]>(`${BASE_URL}/all`);

export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesPagination,
  getCategory,
  updateCategory,
  type Category
};
