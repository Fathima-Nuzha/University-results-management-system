package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.CourseDTO;

import java.util.List;

public interface CourseService {
    CourseDTO createCourse(CourseDTO dto);
    CourseDTO updateCourse(Long id, CourseDTO dto);
    void deleteCourse(Long id);
    List<CourseDTO> getAllCourses();
    CourseDTO getCourseById(Long id);
    void bulkUploadCourses(List<String> courseNames);
}
