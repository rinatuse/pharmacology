export interface Course {
  id: number;
  name: string;
  topics: Topic[];
  created_at: string;
  updated_at: string;
  students_count?: number;
}

export interface Topic {
  id: number;
  name: string;
  course_id: number;
  lessons: Lesson[];
  created_at: string;
}

export interface Lesson {
  id: number;
  topic_id: number;
  theory_content: string;
  test_content: string;
  lesson_order: number;
  created_at: string;
}
