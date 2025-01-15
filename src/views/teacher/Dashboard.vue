<template>
    <div class="p-4">
      <Card>
        <template #title>
          Панель преподавателя
        </template>
        <template #content>
          <div class="grid">
            <div class="col-12 md:col-6">
              <Card>
                <template #title>Мои курсы</template>
                <template #content>
                  Активных курсов: 0
                </template>
              </Card>
            </div>
            <div class="col-12 md:col-6">
              <Card>
                <template #title>Студенты</template>
                <template #content>
                  Активных студентов: 0
                </template>
              </Card>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </template>