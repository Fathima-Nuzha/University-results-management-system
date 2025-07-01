package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.ResultDTO;
import com.vavuniya.resultsystem.dto.StudentDTO;
import com.vavuniya.resultsystem.dto.StudentResultDTO;
import com.vavuniya.resultsystem.model.Course;
import com.vavuniya.resultsystem.model.Result;
import com.vavuniya.resultsystem.model.Student;
import com.vavuniya.resultsystem.repository.CourseRepository;
import com.vavuniya.resultsystem.repository.ResultRepository;
import com.vavuniya.resultsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private StudentDTO toDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setRegNo(student.getRegNo());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        // Do NOT send password back
        dto.setCourseId(student.getCourse() != null ? student.getCourse().getId() : null);
        return dto;
    }

    private Student toEntity(StudentDTO dto) {
        Student student = new Student();
        student.setRegNo(dto.getRegNo());
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        // encode password only if present
        if (dto.getPassword() != null) {
            student.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        if (dto.getCourseId() != null) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            student.setCourse(course);
        }
        return student;
    }

    @Override
    public StudentDTO createStudent(StudentDTO dto) {
        Student student = toEntity(dto);
        return toDTO(studentRepository.save(student));
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            student.setPassword(passwordEncoder.encode(dto.getPassword()));
        }
        if (dto.getCourseId() != null) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            student.setCourse(course);
        }
        return toDTO(studentRepository.save(student));
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    @Override
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public StudentDTO getStudentById(Long id) {
        return studentRepository.findById(id).map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    @Override
    public void bulkUploadStudents(List<StudentDTO> students) {
        for (StudentDTO dto : students) {
            boolean exists = studentRepository.findByRegNo(dto.getRegNo()).isPresent();
            if (!exists) {
                Student student = toEntity(dto);
                studentRepository.save(student);
            }
        }
    }

    // New method to get StudentResultDTO by regNo
    @Override
    public StudentResultDTO getResultsByRegNo(String regNo) {
        Student student = studentRepository.findByRegNo(regNo)
                .orElseThrow(() -> new RuntimeException("Student with regNo " + regNo + " not found"));

        List<Result> results = resultRepository.findByStudent(student);

        List<ResultDTO> resultDTOs = results.stream()
                .map(this::toResultDTO)
                .collect(Collectors.toList());

        double cgpa = results.stream()
                .mapToDouble(Result::getMarks)
                .average()
                .orElse(0.0);

        StudentResultDTO studentResultDTO = new StudentResultDTO();
        studentResultDTO.setRegNo(student.getRegNo());
        studentResultDTO.setName(student.getName());
        studentResultDTO.setResults(resultDTOs);
        studentResultDTO.setCgpa(cgpa);

        return studentResultDTO;
    }

    private ResultDTO toResultDTO(Result result) {
        ResultDTO dto = new ResultDTO();
        dto.setId(result.getId());
        dto.setMarks(result.getMarks());
        dto.setGrade(result.getGrade());
        dto.setStudentId(result.getStudent().getId());
        dto.setModuleId(result.getModule().getId());
        dto.setModuleCode(result.getModule().getModuleCode()); // add this line
        return dto;
    }

}
