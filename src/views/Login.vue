<template>
  <div class="surface-ground">
    <div style="height: 100vh" class="flex align-items-center justify-content-center">
      <Card class="w-30rem">
        <template #title>
          Вход в систему
        </template>
        <template #content>
          <form @submit.prevent="handleSubmit">
            <div class="flex flex-column gap-2 mb-3">
              <label for="email">Email</label>
              <InputText 
                id="email"
                v-model="email" 
                type="email"
                class="w-full"
              />
            </div>
            
            <div class="flex flex-column gap-2 mb-3">
              <label for="password">Пароль</label>
              <Password 
                id="password"
                v-model="password" 
                :feedback="false"
                toggleMask
                class="w-full"
              />
            </div>
            <small class="text-red-500" v-if="error">{{ error }}</small>
            <Button 
              type="submit" 
              label="Войти" 
              class="w-full"
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
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('') 

const handleSubmit = () => {
  error.value = ''
  const role = authStore.login(email.value, password.value)
  
  if (role) {
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
}
</script>