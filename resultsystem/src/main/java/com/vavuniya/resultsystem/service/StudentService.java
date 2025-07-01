package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.StudentDTO;
import com.vavuniya.resultsystem.dto.StudentResultDTO;

import java.util.List;

public interface StudentService {
    StudentDTO createStudent(StudentDTO dto);
    StudentDTO updateStudent(Long id, StudentDTO dto);
    void deleteStudent(Long id);
    List<StudentDTO> getAllStudents();
    StudentDTO getStudentById(Long id);
    void bulkUploadStudents(List<StudentDTO> students);

    // New method to get results by regNo
    StudentResultDTO getResultsByRegNo(String regNo);
}
