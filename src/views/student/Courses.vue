<template>
    <div>
      <Card>
        <template #title>
          Мои курсы
        </template>
        <template #content>
          <DataView :value="courses" :layout="'grid'" dataKey="id">
            <template #grid="{items}">
              <div v-for="item in items" :key="item.id" class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                <Card>
                  <template #title>
                    {{ item.title}}
                  </template>
                  <template #content>
                    <ProgressBar :value="item.progress" />
                    <div class="mt-3">
                      Прогресс: {{ item.progress }}%
                    </div>
                  </template>
                  <template #footer>
                    <Button label="Продолжить" icon="pi pi-arrow-right" />
                  </template>
                </Card>
              </div>
            </template>
          </DataView>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'

  interface Course {
    id: number
    title: string
    progress: number
  }
  
  const courses = ref<Course[]>([
    { id: 1, title: 'Введение в фармакологию', progress: 75 },
    { id: 2, title: 'Основы фармакокинетики', progress: 30 },
  ])
  </script>