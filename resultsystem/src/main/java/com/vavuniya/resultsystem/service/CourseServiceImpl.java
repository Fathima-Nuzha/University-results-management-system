package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.CourseDTO;
import com.vavuniya.resultsystem.model.Course;
import com.vavuniya.resultsystem.repository.CourseRepository;
import com.vavuniya.resultsystem.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    private CourseDTO toDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setCourseName(course.getCourseName());
        return dto;
    }

    private Course toEntity(CourseDTO dto) {
        Course course = new Course();
        course.setCourseName(dto.getCourseName());
        return course;
    }

    @Override
    public CourseDTO createCourse(CourseDTO dto) {
        Course course = toEntity(dto);
        return toDTO(courseRepository.save(course));
    }

    @Override
    public CourseDTO updateCourse(Long id, CourseDTO dto) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setCourseName(dto.getCourseName());
        return toDTO(courseRepository.save(course));
    }

    @Override
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public CourseDTO getCourseById(Long id) {
        return courseRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    @Override
    public void bulkUploadCourses(List<String> courseNames) {
        for (String name : courseNames) {
            if (!courseRepository.findByCourseName(name).isPresent()) {
                Course course = new Course(name);
                courseRepository.save(course);
            }
        }
    }
}
