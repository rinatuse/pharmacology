<template>
  <div class="surface-ground">
    <div style="height: 100vh" class="flex align-items-center justify-content-center">
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
                v-model="formData.email" 
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
                v-model="formData.password" 
                :class="{ 'p-invalid': v$.password.$invalid && v$.password.$dirty }"
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
              <Checkbox v-model="rememberMe" :binary="true" id="remember"/>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useVuelidate } from '@vuelidate/core'
import type { ValidationRule } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

interface FormData {
  email: string
  password: string
}

const router = useRouter()
const authStore = useAuthStore()
const rememberMe = ref(false)

const formData = ref<FormData>({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const rules = {
  email: { 
    required: required as ValidationRule,
    email: email as ValidationRule
  },
  password: { 
    required: required as ValidationRule,
    minLength: minLength(6) as ValidationRule
  }
}

const v$ = useVuelidate(rules, formData)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  
  try {
    const isFormValid = await v$.value.$validate()
    if (!isFormValid) {
      return
    }

    const role = authStore.login(formData.value.email, formData.value.password)
    
    if (role) {

      if (rememberMe.value) {
        localStorage.setItem('rememberMe', 'true')
      }

      switch (role) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'teacher':
          router.push('/teacher/dashboard')
          break
        case 'student':
          router.push('/student/dashboard')
          break
      }
    } else {
      error.value = 'Неверный email или пароль'
    }
  } catch (e) {
    error.value = 'Произошла ошибка при входе'
  } finally {
    loading.value = false
  }
}
</script>

