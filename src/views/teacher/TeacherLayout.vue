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
  import { useRouter } from 'vue-router'
  import { MenuItem } from 'primevue/menuitem'
  import Menubar from 'primevue/menubar'
  
  const router = useRouter()
  
  const items = ref<MenuItem[]>([
    {
      label: 'Дашборд',
      icon: 'pi pi-home',
      command: () => router.push('/teacher/dashboard')
    },
    {
      label: 'Курсы',
      icon: 'pi pi-book',
      command: () => router.push('/teacher/courses')
    },
    {
      label: 'Студенты',
      icon: 'pi pi-users',
      command: () => router.push('/teacher/students')
    }
  ])
  
  const handleLogout = () => {
    router.push('/login')
  }
  </script>