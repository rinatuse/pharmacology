// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@views/Home.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@views/Login.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@views/admin/AdminLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('@views/admin/Dashboard.vue')
        }
      ]
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: () => import('@views/teacher/TeacherLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'TeacherDashboard',
          component: () => import('@views/teacher/Dashboard.vue')
        }
      ]
    },
    {
      path: '/student',
      name: 'Student',
      component: () => import('@views/student/StudentLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'StudentDashboard',
          component: () => import('@views/student/Dashboard.vue')
        }
      ]
    }
  ]
})

export default router