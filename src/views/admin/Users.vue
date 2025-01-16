<!-- src/views/admin/Users.vue -->
<template>
    <div>
      <Card>
        <template #title>
          <div class="flex justify-content-between align-items-center">
            <span>Управление пользователями</span>
            <Button 
              label="Добавить пользователя" 
              icon="pi pi-plus" 
              @click="openNew"
            />
          </div>
        </template>
        <template #content>
          <DataTable :value="users" :paginator="true" :rows="10">
            <Column field="email" header="Email"></Column>
            <Column field="role" header="Роль">
              <template #body="slotProps">
                <Tag :severity="getRoleSeverity(slotProps.data.role)">
                  {{ getRoleLabel(slotProps.data.role) }}
                </Tag>
              </template>
            </Column>
            <Column field="status" header="Статус">
              <template #body="slotProps">
                <Tag :severity="slotProps.data.status === 'active' ? 'success' : 'danger'">
                  {{ slotProps.data.status === 'active' ? 'Активен' : 'Заблокирован' }}
                </Tag>
              </template>
            </Column>
            <Column header="Действия">
              <template #body="slotProps">
                <Button 
                  icon="pi pi-pencil" 
                  severity="secondary" 
                  text 
                  @click="editUser(slotProps.data)"
                  class="mr-2"
                />
                <Button 
                  :icon="slotProps.data.status === 'active' ? 'pi pi-lock' : 'pi pi-lock-open'" 
                  :severity="slotProps.data.status === 'active' ? 'danger' : 'success'" 
                  text 
                  @click="toggleUserStatus(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
  
          <!-- Диалог добавления/редактирования пользователя -->
          <Dialog 
            v-model:visible="userDialog" 
            :header="isEditMode ? 'Редактировать пользователя' : 'Новый пользователь'"
            modal
          >
            <div class="flex flex-column gap-3">
              <div class="field">
                <label for="email">Email</label>
                <InputText 
                  id="email" 
                  v-model="selectedUser.email" 
                  class="w-full"
                />
              </div>
              <div class="field">
                <label for="role">Роль</label>
                <Dropdown
                  id="role"
                  v-model="selectedUser.role"
                  :options="roles"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full"
                />
              </div>
            </div>
            <template #footer>
              <Button label="Отмена" text @click="closeDialog" />
              <Button label="Сохранить" @click="saveUser" />
            </template>
          </Dialog>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { UserRole } from '../../types/auth'
  
  interface User {
    id: number
    email: string
    role: UserRole
    status: 'active' | 'blocked'
  }
  
  // Имитация данных
  const users = ref<User[]>([
    { id: 1, email: 'admin@test.com', role: 'admin', status: 'active' },
    { id: 2, email: 'teacher@test.com', role: 'teacher', status: 'active' },
    { id: 3, email: 'student@test.com', role: 'student', status: 'blocked' },
  ])
  
  const roles = [
    { label: 'Администратор', value: 'admin' },
    { label: 'Преподаватель', value: 'teacher' },
    { label: 'Студент', value: 'student' }
  ]
  
  const userDialog = ref(false)
  const isEditMode = ref(false)
  const selectedUser = ref<User>({
    id: 0,
    email: '',
    role: 'student',
    status: 'active'
  })
  
  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'Администратор'
      case 'teacher': return 'Преподаватель'
      case 'student': return 'Студент'
      default: return role
    }
  }
  
  const getRoleSeverity = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'danger'
      case 'teacher': return 'warning'
      case 'student': return 'info'
      default: return 'info'
    }
  }
  
  const openNew = () => {
    selectedUser.value = {
      id: 0,
      email: '',
      role: 'student',
      status: 'active'
    }
    isEditMode.value = false
    userDialog.value = true
  }
  
  const editUser = (user: User) => {
    selectedUser.value = { ...user }
    isEditMode.value = true
    userDialog.value = true
  }
  
  const closeDialog = () => {
    userDialog.value = false
  }
  
  const saveUser = () => {
    if (isEditMode.value) {
      // Обновляем существующего пользователя
      const index = users.value.findIndex(u => u.id === selectedUser.value.id)
      if (index !== -1) {
        users.value[index] = { ...selectedUser.value }
      }
    } else {
      // Добавляем нового пользователя
      users.value.push({
        ...selectedUser.value,
        id: users.value.length + 1
      })
    }
    userDialog.value = false
  }
  
  const toggleUserStatus = (user: User) => {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index].status = user.status === 'active' ? 'blocked' : 'active'
    }
  }
  </script>