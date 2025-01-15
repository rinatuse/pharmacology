<template>
    <div class="p-4">
      <Card>
        <template #title>
          Панель администратора
        </template>
        <template #content>
          <div class="grid">
            <div class="col-12 md:col-4">
              <Card>
                <template #title>Пользователи</template>
                <template #content>
                  Всего пользователей: 0
                </template>
              </Card>
            </div>
            <div class="col-12 md:col-4">
              <Card>
                <template #title>Курсы</template>
                <template #content>
                  Активных курсов: 0
                </template>
              </Card>
            </div>
            <div class="col-12 md:col-4">
              <Card>
                <template #title>Тесты</template>
                <template #content>
                  Созданных тестов: 0
                </template>
              </Card>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </template>