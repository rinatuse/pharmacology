<template>
    <div>
      <Card>
        <template #title>
          Управление тестами
        </template>
        <template #content>
          <Button 
            label="Создать тест" 
            icon="pi pi-plus" 
            @click="createTest"
            class="mb-3"
          />
          <DataTable :value="tests" :paginator="true" :rows="10">
            <Column field="title" header="Название"></Column>
            <Column field="questionsCount" header="Вопросов"></Column>
            <Column field="averageScore" header="Средний балл"></Column>
            <Column header="Действия">
              <template #body>
                <Button icon="pi pi-pencil" severity="secondary" text />
                <Button icon="pi pi-trash" severity="danger" text />
              </template>
            </Column>
          </DataTable>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const tests = ref([
    { title: 'Тест по введению', questionsCount: 10, averageScore: 85 },
    { title: 'Промежуточный контроль', questionsCount: 15, averageScore: 78 },
  ])
  
  const createTest = () => {
    // Логика создания теста
  }
  </script>