import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserRole } from '../types/auth'


export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = () => user.value !== null

  const hasRole = (role: UserRole) => user.value?.role === role


  // Имитация базы данных пользователей
  const users = [
    { email: 'admin@test.com', password: '123456', role: 'admin' as UserRole},
    { email: 'teacher@test.com', password: '123456', role: 'teacher' as UserRole},
    { email: 'student@test.com', password: '123456', role: 'student' as UserRole}
  ]

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      user.value = { email: foundUser.email, role: foundUser.role }
      return foundUser.role
    }
    return null
  }

  const logout = () => {
    user.value = null
  }

  return {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole
  }
}, {
  persist: true
})