import { defineStore } from 'pinia'
import { ref } from 'vue'

type UserRole = 'admin' | 'teacher' | 'student'

interface User {
  email: string
  role: UserRole
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)

  // Имитация базы данных пользователей
  const users = [
    { email: 'admin@test.com', password: '123456', role: 'admin' },
    { email: 'teacher@test.com', password: '123456', role: 'teacher' },
    { email: 'student@test.com', password: '123456', role: 'student' }
  ]

  const login = (email: string, password: string) => {
    const foundUser = users.find(u => u.email === email && u.password === password)
    if (foundUser) {
      user.value = { email: foundUser.email, role: foundUser.role as UserRole }
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
    logout
  }
})