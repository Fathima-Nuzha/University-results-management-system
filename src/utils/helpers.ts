import { Course, Faculty, Result, Student } from '../types';
import { mockCourses, mockFaculties, mockResults, mockStudents } from '../data/mockData';

export const getFacultyById = (id: string): Faculty | undefined => {
  return mockFaculties.find(faculty => faculty.id === id);
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getStudentById = (studentId: string): Student | undefined => {
  return mockStudents.find(student => student.studentId === studentId);
};

export const getStudentResults = (studentId: string): Result[] => {
  return mockResults.filter(result => result.studentId === studentId);
};

export const getCoursesForFaculty = (facultyId: string): Course[] => {
  return mockCourses.filter(course => course.facultyId === facultyId);
};

export const getStudentsForFaculty = (facultyId: string): Student[] => {
  return mockStudents.filter(student => student.facultyId === facultyId);
};

export const calculateGPA = (results: Result[]): number => {
  if (results.length === 0) return 0;
  
  const gradePoints: Record<string, number> = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0,
  };
  
  const totalPoints = results.reduce((sum, result) => {
    const courseInfo = getCourseById(result.courseId);
    const points = gradePoints[result.grade] || 0;
    const creditHours = courseInfo?.creditHours || 3; // Default to 3 if not found
    return sum + (points * creditHours);
  }, 0);
  
  const totalCreditHours = results.reduce((sum, result) => {
    const courseInfo = getCourseById(result.courseId);
    return sum + (courseInfo?.creditHours || 3); // Default to 3 if not found
  }, 0);
  
  return parseFloat((totalPoints / totalCreditHours).toFixed(2));
};

export const getGradeLetter = (marks: number): string => {
  if (marks >= 90) return 'A+';
  if (marks >= 85) return 'A';
  if (marks >= 80) return 'A-';
  if (marks >= 75) return 'B+';
  if (marks >= 70) return 'B';
  if (marks >= 65) return 'B-';
  if (marks >= 60) return 'C+';
  if (marks >= 55) return 'C';
  if (marks >= 50) return 'C-';
  if (marks >= 45) return 'D+';
  if (marks >= 40) return 'D';
  return 'F';
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};