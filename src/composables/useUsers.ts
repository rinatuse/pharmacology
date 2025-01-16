import { ref } from 'vue'
import type { User, CreateUserDto, UpdateUserDto } from '../types/user'


export function useUsers() {

    const users = ref<User[]>([
        { id: 1, email: 'admin@test.com', role: 'admin', status: 'active' },
        { id: 2, email: 'teacher@test.com', role: 'teacher', status: 'active' },
        { id: 3, email: 'student@test.com', role: 'student', status: 'blocked' },
    ])

    const getUsers = async () => { return users.value }

    const createUser = (userData: CreateUserDto) => {
        const newUser: User = {
        id: users.value.length + 1,
        email: userData.email,
        role: userData.role,
        status: 'active'
    }
    users.value.push(newUser)
    return newUser}

    const updateUser = async (userId: number, userData: UpdateUserDto) => {
        const index = users.value.findIndex(u => u.id === userId)
        if (index !== -1) {
            users.value[index] = { ...users.value[index], ...userData }
            return users.value[index]
        }
        return null}

    const toggleStatus = async (userId: number) => {
        const index = users.value.findIndex(u => u.id === userId)
        if (index !== -1) {
            users.value[index].status = users.value[index].status === 'active' ? 'blocked' : 'active'
            return users.value[index]
        }
        return null
    }

    return {
        users,
        getUsers,
        createUser,
        updateUser,
        toggleStatus
    }
}