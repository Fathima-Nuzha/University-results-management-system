package com.vavuniya.resultsystem.controller;

import com.vavuniya.resultsystem.dto.StudentDTO;
import com.vavuniya.resultsystem.dto.StudentResultDTO;
import com.vavuniya.resultsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@RequestBody StudentDTO dto) {
        return ResponseEntity.ok(studentService.createStudent(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable Long id, @RequestBody StudentDTO dto) {
        return ResponseEntity.ok(studentService.updateStudent(id, dto));
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        return ResponseEntity.ok(studentService.getStudentById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadStudentsCsv(@RequestParam("file") MultipartFile file) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<StudentDTO> students = new ArrayList<>();
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // skip header
                    continue;
                }
                if (!line.trim().isEmpty()) {
                    // CSV columns: regNo,name,email,password,courseId
                    String[] parts = line.split(",");
                    if (parts.length >= 5) {
                        StudentDTO dto = new StudentDTO();
                        dto.setRegNo(parts[0].trim());
                        dto.setName(parts[1].trim());
                        dto.setEmail(parts[2].trim());
                        dto.setPassword(parts[3].trim());
                        try {
                            dto.setCourseId(Long.parseLong(parts[4].trim()));
                        } catch (NumberFormatException e) {
                            return ResponseEntity.badRequest().body("Invalid courseId in CSV");
                        }
                        students.add(dto);
                    }
                }
            }
            studentService.bulkUploadStudents(students);
            return ResponseEntity.ok("Students uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading students: " + e.getMessage());
        }
    }

    // New endpoint for student's results by regNo
    @GetMapping("/me/results")
    public ResponseEntity<StudentResultDTO> getMyResults(@RequestParam String regNo) {
        StudentResultDTO studentResultDTO = studentService.getResultsByRegNo(regNo);
        return ResponseEntity.ok(studentResultDTO);
    }
}
