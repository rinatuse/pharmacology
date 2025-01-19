import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } });
    return;
  }

  next();
};

export const roleGuard = (allowedRole: string) => {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const authStore = useAuthStore();

    if (!authStore.hasRole(allowedRole as any)) {
      next({ name: 'Home' });
      return;
    }

    next();
  };
};
