<template>
    <div>
      <Card>
        <template #title>
          Доступные тесты
        </template>
        <template #content>
          <DataTable :value="tests" :paginator="true" :rows="10">
            <Column field="title" header="Название"></Column>
            <Column field="dueDate" header="Срок сдачи"></Column>
            <Column field="status" header="Статус"></Column>
            <Column header="Действия">
              <template #body="slotProps">
                <Button 
                  icon="pi pi-play" 
                  :disabled="slotProps.data.status === 'Завершен'"
                  severity="secondary" 
                  text 
                />
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
    { 
      title: 'Тест по введению', 
      dueDate: '2024-01-20', 
      status: 'Завершен' 
    },
    { 
      title: 'Промежуточный контроль', 
      dueDate: '2024-01-25', 
      status: 'Доступен' 
    },
  ])
  </script>