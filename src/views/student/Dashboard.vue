<template>
    <div class="p-4">
      <Card>
        <template #title>
          Панель студента
        </template>
        <template #content>
          <div class="grid">
            <div class="col-12 md:col-6">
              <Card>
                <template #title>Мои курсы</template>
                <template #content>
                  Текущих курсов: 0
                </template>
              </Card>
            </div>
            <div class="col-12 md:col-6">
              <Card>
                <template #title>Прогресс</template>
                <template #content>
                  Завершено: 0%
                </template>
              </Card>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </template>