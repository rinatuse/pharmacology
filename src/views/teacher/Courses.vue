<template>
  <div class="p-4">
    <ConfirmDialog group="course" />

    <Card>
      <template #title>
        <div class="flex justify-content-between align-items-center">
          <h2>Управление курсами</h2>
          <Button
            label="Создать курс"
            icon="pi pi-plus"
            @click="openNewCourseDialog"
          />
        </div>
      </template>
      <template #content>
        <DataView
          :value="courses"
          :layout="'grid'"
          :paginator="true"
          :rows="6"
          dataKey="id"
        >
          <template #grid="{ items }">
            <div class="grid">
              <div
                v-for="course in items"
                :key="course.id"
                class="col-12 sm:col-6 lg:col-4 p-2"
              >
                <Card>
                  <template #header>
                    <div class="flex justify-content-center">
                      <i class="pi pi-book text-4xl"></i>
                    </div>
                  </template>
                  <template #title>
                    {{ course.name }}
                  </template>
                  <template #subtitle>
                    Тем: {{ course.topics?.length || 0 }}
                  </template>
                  <template #content>
                    <div class="flex flex-column gap-2">
                      <div class="flex align-items-center gap-2">
                        <i class="pi pi-users"></i>
                        <span>Студентов: {{ course.students_count || 0 }}</span>
                      </div>
                      <div class="flex align-items-center gap-2">
                        <i class="pi pi-calendar"></i>
                        <span
                          >Создан:
                          {{
                            new Date(course.created_at).toLocaleDateString()
                          }}</span
                        >
                      </div>
                    </div>
                  </template>
                  <template #footer>
                    <div class="flex justify-content-between">
                      <Button
                        icon="pi pi-pencil"
                        @click="editCourse(course)"
                        text
                      />
                      <Button
                        icon="pi pi-trash"
                        @click="confirmDelete(course)"
                        severity="danger"
                        text
                      />
                    </div>
                  </template>
                </Card>
              </div>
            </div>
          </template>
        </DataView>
      </template>
    </Card>

    <Dialog
      v-model:visible="courseDialog.visible"
      :header="courseDialog.isEdit ? 'Редактировать курс' : 'Новый курс'"
      modal
    >
      <div class="flex flex-column gap-3">
        <div class="field">
          <label for="name">Название курса</label>
          <InputText
            id="name"
            v-model="courseDialog.data.name"
            class="w-full"
          />
        </div>
      </div>
      <template #footer>
        <Button label="Отмена" @click="closeCourseDialog" text />
        <Button label="Сохранить" @click="saveCourse" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { CourseService } from '../../services/course.service';
import type { Course } from '../../types/course';

const toast = useToast();
const confirm = useConfirm();
const courses = ref<Course[]>([]);

// Проверяем инициализацию сервисов
console.log('Confirm service:', confirm);
console.log('Toast service:', toast);

const courseDialog = ref({
  visible: false,
  isEdit: false,
  data: {} as Partial<Course>,
});

const confirmDelete = (course: Course) => {
  console.log('Начинаем процесс удаления курса:', course);
  console.log('Сервис подтверждения:', confirm);

  if (!confirm?.require) {
    console.error('Сервис подтверждения не инициализирован корректно!');
    return;
  }

  confirm.require({
    group: 'course',
    message: `Вы уверены, что хотите удалить курс "${course.name}"?`,
    header: 'Подтверждение удаления',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Да',
    rejectLabel: 'Нет',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    accept: async () => {
      console.log('Подтверждение получено, удаляем курс');
      try {
        await CourseService.deleteCourse(course.id);
        courses.value = courses.value.filter((c) => c.id !== course.id);
        toast.add({
          severity: 'success',
          summary: 'Успешно',
          detail: 'Курс удален',
          life: 3000,
        });
      } catch (error) {
        console.error('Ошибка при удалении:', error);
        toast.add({
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Не удалось удалить курс',
          life: 3000,
        });
      }
    },
    reject: () => {
      console.log('Удаление отменено');
      toast.add({
        severity: 'info',
        summary: 'Отменено',
        detail: 'Удаление курса отменено',
        life: 3000,
      });
    },
  });
};

onMounted(async () => {
  try {
    const response = await CourseService.getAllCourses();
    courses.value = response.data;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось загрузить курсы',
      life: 3000,
    });
  }
});

const openNewCourseDialog = () => {
  courseDialog.value = {
    visible: true,
    isEdit: false,
    data: {},
  };
};

const editCourse = (course: Course) => {
  courseDialog.value = {
    visible: true,
    isEdit: true,
    data: { ...course },
  };
};

const closeCourseDialog = () => {
  courseDialog.value.visible = false;
};

const saveCourse = async () => {
  try {
    if (courseDialog.value.isEdit) {
      await CourseService.updateCourse(
        courseDialog.value.data.id!,
        courseDialog.value.data
      );
    } else {
      await CourseService.createCourse(courseDialog.value.data);
    }

    // Обновляем список курсов
    const response = await CourseService.getAllCourses();
    courses.value = response.data;

    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: courseDialog.value.isEdit ? 'Курс обновлен' : 'Курс создан',
      life: 3000,
    });

    closeCourseDialog();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось сохранить курс',
      life: 3000,
    });
  }
};
</script>
