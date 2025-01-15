<!-- src/views/teacher/Courses.vue -->
<template>
    <div>
      <Card>
        <template #title>
          Управление курсами
        </template>
        <template #content>
          <div>
            <Button 
              label="Создать курс" 
              icon="pi pi-plus" 
              @click="createCourse"
              class="mb-3"
            />
            <DataTable :value="courses" :paginator="true" :rows="10">
              <Column field="title" header="Название"></Column>
              <Column field="studentsCount" header="Студентов"></Column>
              <Column field="status" header="Статус"></Column>
              <Column header="Действия">
                <template #body>
                  <Button icon="pi pi-pencil" severity="secondary" text />
                  <Button icon="pi pi-trash" severity="danger" text />
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const courses = ref([
    { title: 'Введение в фармакологию', studentsCount: 15, status: 'Активный' },
    { title: 'Основы фармакокинетики', studentsCount: 12, status: 'Активный' },
  ])
  
  const createCourse = () => {
   
  }
  </script>