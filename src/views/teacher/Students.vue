<template>
    <div>
      <Card>
        <template #title>
          Список студентов
        </template>
        <template #content>
          <DataTable :value="students" :paginator="true" :rows="10">
            <Column field="name" header="ФИО"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="progress" header="Прогресс">
              <template #body="slotProps">
                <ProgressBar :value="slotProps.data.progress" />
              </template>
            </Column>
            <Column header="Действия">
              <template #body>
                <Button icon="pi pi-eye" severity="secondary" text />
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const students = ref([
    { name: 'Иван Иванов', email: 'ivan@test.com', progress: 75 },
    { name: 'Мария Петрова', email: 'maria@test.com', progress: 90 },
  ])
  </script>