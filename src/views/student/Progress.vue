<template>
    <div>
      <Card>
        <template #title>
          Мой прогресс
        </template>
        <template #content>
          <div class="grid">
            <div class="col-12 md:col-6">
              <Chart type="line" :data="chartData" :options="chartOptions" />
            </div>
            <div class="col-12 md:col-6">
              <h3>Последние достижения</h3>
              <Timeline :value="achievements">
                <template #content="slotProps">
                  <small>{{ slotProps.item.date }}</small>
                  <div>{{ slotProps.item.text }}</div>
                </template>
              </Timeline>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const achievements = ref([
    { 
      date: '10.01.2024', 
      text: 'Завершен курс "Введение в фармакологию"' 
    },
    { 
      date: '15.01.2024', 
      text: 'Пройден тест с результатом 95%' 
    },
  ])
  
  const chartData = ref({
    labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
    datasets: [
      {
        label: 'Прогресс обучения',
        data: [30, 45, 60, 75, 85],
        fill: false,
        borderColor: '#42A5F5'
      }
    ]
  })
  
  const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false
  })
  </script>