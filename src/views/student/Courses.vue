<template>
    <div>
      <Card>
        <template #title>
          Мои курсы
        </template>
        <template #content>
          <DataView :value="courses" :layout="'grid'">
            <template #grid="slotProps">
              <div class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                <Card>
                  <template #title>
                    {{ slotProps.data.title }}
                  </template>
                  <template #content>
                    <ProgressBar :value="slotProps.data.progress" />
                    <div class="mt-3">
                      Прогресс: {{ slotProps.data.progress }}%
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
  
  const courses = ref([
    { title: 'Введение в фармакологию', progress: 75 },
    { title: 'Основы фармакокинетики', progress: 30 },
  ])
  </script>