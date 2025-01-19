<template>
  <div class="surface-ground">
    <div
      style="height: 100vh"
      class="flex align-items-center justify-content-center"
    >
      <Card class="w-30rem">
        <template #title>
          <div>
            <i class="pi pi-user mr-2"></i>
            <span>Вход в систему</span>
          </div>
        </template>
        <template #content>
          <form @submit.prevent="handleSubmit">
            <div class="flex flex-column gap-2 mb-3">
              <label for="email">Email</label>
              <InputText
                id="email"
                v-model="email"
                :class="{ 'p-invalid': v$.email.$invalid && v$.email.$dirty }"
                type="email"
                class="w-full"
                autofocus
                placeholder="Введите email"
              />
              <small class="p-error" v-if="v$.email.$error">
                Введите корректный email
              </small>
            </div>

            <div class="flex flex-column gap-2 mb-3">
              <label for="password">Пароль</label>
              <Password
                id="password"
                v-model="password"
                :class="{
                  'p-invalid': v$.password.$invalid && v$.password.$dirty,
                }"
                :feedback="true"
                :toggleMask="true"
                class="w-full"
                placeholder="Введите пароль"
                :promptLabel="'Введите пароль'"
                :weakLabel="'Слабый пароль'"
                :mediumLabel="'Средний пароль'"
                :strongLabel="'Сильный пароль'"
              />
              <small class="p-error" v-if="v$.password.$error">
                Пароль должен быть не менее 6 символов
              </small>
            </div>

            <div class="flex align-items-center mb-3">
              <Checkbox v-model="rememberMe" :binary="true" id="remember" />
              <label for="remember" class="ml-2">Запомнить меня</label>
            </div>

            <div class="flex justify-content-between mb-3">
              <router-link to="/forgot-password" class="no-underline">
                Забыли пароль?
              </router-link>
              <router-link to="/register" class="no-underline">
                Регистрация
              </router-link>
            </div>

            <small class="p-error block mb-3" v-if="error">{{ error }}</small>

            <Button
              type="submit"
              label="Войти"
              class="w-full"
              :disabled="v$.$invalid"
              icon="pi pi-sign-in"
              :loading="loading"
            />
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useVuelidate } from '@vuelidate/core';
import type { ValidationRule } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import type { UserRole } from '../types/user';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

// Refs
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const error = ref('');
const loading = ref(false);

// Validation rules
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, { email, password });

// Handle form submission
const handleSubmit = async () => {
  error.value = '';
  loading.value = true;

  try {
    const isFormValid = await v$.value.$validate();
    if (!isFormValid) {
      return;
    }

    const role = await authStore.login(email.value, password.value);

    if (role) {
      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true');
      }

      const routes: Record<UserRole, string> = {
        admin: '/admin/dashboard',
        teacher: '/teacher/dashboard',
        student: '/student/dashboard',
      };

      toast.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Вы успешно вошли в систему',
        life: 3000,
      });

      await router.push(routes[role]);
    }
  } catch (e) {
    console.error('Login error:', e);
    error.value = 'Неверный email или пароль';
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Неверный email или пароль',
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.p-password {
  width: 100%;
}

:deep(.p-password-input) {
  width: 100%;
}
</style>
