<template>
    <div class="min-h-screen">
      <Menubar :model="items" class="mb-4">
        <template #start>
          <span class="text-xl font-bold mr-4">Фармакология</span>
        </template>
        <template #end>
          <Button 
            icon="pi pi-power-off" 
            @click="handleLogout"
            severity="secondary" 
            text 
          />
        </template>
      </Menubar>
  
      <div class="p-4">
        <RouterView />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { RouterView, useRouter } from 'vue-router'
  import { useAuthStore } from '../../stores/auth'
  import { MenuItem } from 'primevue/menuitem'
  import Menubar from 'primevue/menubar'
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  const items = ref<MenuItem[]>([
    {
      label: 'Дашборд',
      icon: 'pi pi-home',
      command: () => router.push('/student/dashboard')
    },
    {
      label: 'Мои курсы',
      icon: 'pi pi-book',
      command: () => router.push('/student/courses')
    },
    {
      label: 'Прогресс',
      icon: 'pi pi-chart-line',
      command: () => router.push('/student/progress')
    },
  {
    label: 'Тесты',
    icon: 'pi pi-check-square',
    command: () => router.push('/student/tests')
  }
  ])
  
  const handleLogout = () => {
    authStore.logout()
    router.push('/login')
  }
  </script>