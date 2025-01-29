// services/course.service.ts
import api from '../api/axios';
import type { Course, Topic, Lesson } from '../types/course';
import type { AxiosResponse } from 'axios';

export const CourseService = {
  async getAllCourses(): Promise<AxiosResponse<Course[]>> {
    return api.get<Course[]>('/courses/');
  },

  async getCourse(id: number): Promise<AxiosResponse<Course>> {
    return api.get<Course>(`/courses/${id}/`);
  },

  async createCourse(data: Partial<Course>): Promise<AxiosResponse<Course>> {
    return api.post<Course>('/courses/', data);
  },

  async updateCourse(
    id: number,
    data: Partial<Course>
  ): Promise<AxiosResponse<Course>> {
    return api.put<Course>(`/courses/${id}/`, data);
  },

  async deleteCourse(id: number): Promise<AxiosResponse<void>> {
    return api.delete(`/courses/${id}/`);
  },
};
