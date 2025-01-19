import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { AuthService } from '../services/auth.service';
import type { User, UserRole } from '../types/user';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => !!user.value);

    const login = async (
      email: string,
      password: string
    ): Promise<UserRole | null> => {
      try {
        const { data: authData } = await AuthService.login(email, password);
        const { data: userData } = await AuthService.getCurrentUser();
        user.value = userData;
        return userData.role;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    };

    const logout = () => {
      AuthService.logout();
      user.value = null;
    };

    const hasRole = (role: UserRole): boolean => {
      return user.value?.role === role;
    };

    return {
      user,
      isAuthenticated,
      login,
      logout,
      hasRole,
    };
  },
  {
    persist: true,
  }
);
