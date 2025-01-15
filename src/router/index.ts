import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, roleGuard } from './guards'

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
      ],
      beforeEnter: [authGuard, roleGuard('admin')]
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: () => import('@views/teacher/TeacherLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'TeacherDashboard',
          component: () => import('../views/teacher/Dashboard.vue')
        },
        {
          path: 'courses',
          name: 'TeacherCourses',
          component: () => import('../views/teacher/Courses.vue')
        },
        {
          path: 'students',
          name: 'TeacherStudents',
          component: () => import('../views/teacher/Students.vue')
        },
        {
          path: 'tests',
          name: 'TeacherTests',
          component: () => import('../views/teacher/Tests.vue')
        }
      ],
      beforeEnter: [authGuard, roleGuard('teacher')]
    },
    {
      path: '/student',
      name: 'Student',
      component: () => import('@views/student/StudentLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'StudentDashboard',
          component: () => import('../views/student/Dashboard.vue')
        },
        {
          path: 'courses',
          name: 'StudentCourses',
          component: () => import('../views/student/Courses.vue')
        },
        {
          path: 'progress',
          name: 'StudentProgress',
          component: () => import('../views/student/Progress.vue')
        },
        {
          path: 'tests',
          name: 'StudentTests',
          component: () => import('../views/student/Tests.vue')
        }
      ],
      beforeEnter: [authGuard, roleGuard('student')]
    }
  ]
})

export default router