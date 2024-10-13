import axios from "axios";

// API'nin base URL'si
const API_URL = "http://localhost:3000";

// Tüm kullanıcıları getiren fonksiyon
export const getUsers = (
  search: string = "",
  page: number = 1,
  pageSize: number = 5
) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("pageSize", pageSize.toString());

  return axios.get(`${API_URL}/users?${params.toString()}`);
};

// Belirli bir ID'ye sahip kullanıcıyı getiren fonksiyon
export const getUserById = (id: number) => {
  return axios.get(`${API_URL}/users/${id}`);
};

// Yeni bir kullanıcı kaydı oluşturan fonksiyon
export const saveUser = (user: {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  country: string;
  district: string;
  role: string;
}) => {
  return axios.post(`${API_URL}/users/save`, user);
};

// Mevcut bir kullanıcıyı güncelleyen fonksiyon
export const updateUser = (user: {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  phone?: string;
  age?: number;
}) => {
  return axios.post(`${API_URL}/users/update`, user);
};
