import api from './_api';

const BASE_URL = `/auth`;

interface LoginValues {
  username: string;
  password: string;
}

const login = async (values: LoginValues) => await api.post(`${BASE_URL}/login`, values);

const logout = async () => await api.post(`${BASE_URL}/logout`);

export { login, logout };
