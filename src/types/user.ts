export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  role: UserRole;
}
