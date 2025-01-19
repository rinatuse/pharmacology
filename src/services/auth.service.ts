import api from '../api/axios';
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../types/user';
import type { AxiosResponse } from 'axios';

export const AuthService = {
  async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    const response = await api.post<AuthResponse>('/token/', {
      email,
      password,
    });
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response;
  },

  async register(userData: RegisterData): Promise<AxiosResponse<User>> {
    return api.post<User>('/users/', userData);
  },

  async getCurrentUser(): Promise<AxiosResponse<User>> {
    return api.get<User>('/users/me/');
  },

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};
