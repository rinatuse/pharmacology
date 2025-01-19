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
      <Menubar :model="menuItems" class="mb-3" />
    </div>
    <div class="layout-content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';

const router = useRouter();
const authStore = useAuthStore();

const menuItems = ref<MenuItem[]>([
  {
    label: 'Дашборд',
    icon: 'pi pi-home',
    command: () => router.push('/admin/dashboard'),
  },
  {
    label: 'Пользователи',
    icon: 'pi pi-users',
    command: () => router.push('/admin/users'),
  },
  {
    label: 'Курсы',
    icon: 'pi pi-book',
    command: () => router.push('/admin/courses'),
  },
  {
    label: 'Настройки',
    icon: 'pi pi-cog',
    command: () => router.push('/admin/settings'),
  },
]);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
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
