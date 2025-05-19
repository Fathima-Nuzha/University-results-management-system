// Type definitions for our application

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
}

export interface Faculty {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  semester: number;
  creditHours: number;
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  facultyId: string;
  currentSemester: number;
  enrollmentYear: number;
  profileImage?: string;
}

export interface Result {
  id: string;
  studentId: string;
  courseId: string;
  semester: number;
  marks: number;
  grade: string;
  academicYear: string;
}

export interface Stats {
  totalStudents: number;
  totalFaculties: number;
  totalCourses: number;
  totalResults: number;
}