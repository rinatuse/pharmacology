import type { UserRole } from './auth'

export interface User {
    id: number
    email: string
    role: UserRole
    status: 'active' | 'blocked'
}

export interface CreateUserDto {
    email: string
    role: UserRole
    password: string
}

export interface UpdateUserDto {
    email?: string
    role?: UserRole
    status?: 'active' | 'blocked'
}