<template>
    <div class="flex flex-column align-items-center justify-content-center min-h-screen bg-gray-100">
      <Card class="md:w-6 m-4">
        <template #title>
          Образовательная платформа по фармакологии
        </template>
        <template #content>
          <div class="flex flex-column gap-3">
            <Button 
              label="Вход для студентов" 
              icon="pi pi-users" 
              @click="router.push('/login')" 
              severity="primary"
            />
            <Button 
              label="Вход для преподавателей" 
              icon="pi pi-user" 
              @click="router.push('/login')" 
              severity="secondary"
            />
          </div>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  </script>