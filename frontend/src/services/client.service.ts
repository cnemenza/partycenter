import { GeneralsConstants } from '@/constants';
import { createUrlSearchParams } from '@/utils/url.util';
import api from './_api';

const BASE_URL = `/clients`;

interface ParamsValues {
  search: string;
}

interface Client {
  id: string;
  fullName: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  secondaryPhone: string;
  clientAddresses: ClientAddress[];
}

interface ClientAddress {
  address: string;
  deliveryId: string;
}

const getClientsPagination = async (currentPage: number, paramsValues: ParamsValues) => {
  const params = createUrlSearchParams([
    { key: 'page', value: currentPage },
    { key: 'pageSize', value: GeneralsConstants.DATATABLE_PAGE_SIZE },
    { key: 'search', value: paramsValues.search }
  ]);

  return await api.get(BASE_URL, { params });
};

const getClient = async (id: string) => await api.get<Client>(`${BASE_URL}/${id}`);

const getClients = async (keyword: string, take: number) => {
  const params = createUrlSearchParams([
    { key: 'keyword', value: keyword },
    { key: 'take', value: take }
  ]);

  return await api.get<Client[]>(`${BASE_URL}/all`, { params });
};

const createClient = async (data: Client) => await api.post(`${BASE_URL}`, data);

const updateClient = async (id: string, data: Client) => await api.put(`${BASE_URL}/${id}`, data);

const deleteClient = async (id: string) => await api.delete(`${BASE_URL}/${id}`);

export {
  createClient,
  deleteClient,
  getClient,
  getClients,
  getClientsPagination,
  updateClient,
  type Client,
  type ClientAddress
};
