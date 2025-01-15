export type UserRole = 'admin' | 'teacher' | 'student'

export interface User {
    email: string,
    role: UserRole
}