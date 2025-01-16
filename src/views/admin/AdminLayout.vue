<template>
    <div>
      <div>
        <div class="layout-topbar">
          <h1 class="topbar-title">Админ панель</h1>
          <Button
            icon="pi pi-power-off"
            @click="handleLogout"
            severity="secondary"
            />
        </div>
      </div>
      <div class="layout-content">
        <RouterView />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import { useAuthStore } from '../../stores/auth'

  const router = useRouter()
  const authStore = useAuthStore()

  const handleLogout = () => {
    authStore.logout()
    router.push('/login')
  }
  </script>

<style scoped>
.layout-topbar {
  background-color: var(--primary-color);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar-title {
  color: rgb(0, 0, 0);
  margin: 0;
}

.layout-content {
  padding: 1rem;
}
</style>