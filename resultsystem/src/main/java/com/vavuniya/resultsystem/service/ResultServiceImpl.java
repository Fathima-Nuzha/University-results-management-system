package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.ResultDTO;
import com.vavuniya.resultsystem.dto.StudentResultDTO;
import com.vavuniya.resultsystem.model.Module;
import com.vavuniya.resultsystem.model.Result;
import com.vavuniya.resultsystem.model.Student;
import com.vavuniya.resultsystem.repository.ModuleRepository;
import com.vavuniya.resultsystem.repository.ResultRepository;
import com.vavuniya.resultsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResultServiceImpl implements ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    private ResultDTO toDTO(Result result) {
        ResultDTO dto = new ResultDTO();
        dto.setId(result.getId());
        System.out.println(result.getId());
        dto.setMarks(result.getMarks());
        dto.setGrade(result.getGrade());
        dto.setStudentId(result.getStudent().getId());
        System.out.println(result.getModule().getId());
        dto.setModuleCode(result.getModule().getModuleCode());
        return dto;
    }

    private Result toEntity(ResultDTO dto) {
        Result result = new Result();
        result.setMarks(dto.getMarks());
        result.setGrade(dto.getGrade());

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        result.setStudent(student);

        Module module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found"));
        result.setModule(module);

        return result;
    }

    @Override
    public ResultDTO createResult(ResultDTO dto) {
        Result result = toEntity(dto);
        return toDTO(resultRepository.save(result));
    }

    @Override
    public ResultDTO updateResult(Long id, ResultDTO dto) {
        Result result = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        result.setMarks(dto.getMarks());
        result.setGrade(dto.getGrade());

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        result.setStudent(student);

        Module module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found"));
        result.setModule(module);

        return toDTO(resultRepository.save(result));
    }

    @Override
    public void deleteResult(Long id) {
        resultRepository.deleteById(id);
    }

    @Override
    public List<ResultDTO> getAllResults() {
        return resultRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ResultDTO getResultById(Long id) {
        return resultRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Result not found"));
    }

    @Override
    public void bulkUploadResults(List<ResultDTO> resultDTOs) {
        List<Result> results = new ArrayList<>();
        for (ResultDTO dto : resultDTOs) {
            results.add(toEntity(dto));
        }
        resultRepository.saveAll(results);
    }

    @Override
    public void uploadResultsFromCsv(MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new RuntimeException("Uploaded file is empty");
        }

        List<Result> resultsToSave = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            int lineNumber = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;
                if (lineNumber == 1) continue; // Skip header

                String[] fields = line.split(",");

                if (fields.length < 4) {
                    throw new RuntimeException("Invalid data at line " + lineNumber);
                }

                String studentRegNo = fields[0].trim();
                String moduleCode = fields[1].trim();
                double marks = Double.parseDouble(fields[2].trim());
                String grade = fields[3].trim();

                Student student = studentRepository.findByRegNo(studentRegNo)
                        .orElseThrow(() -> new RuntimeException("Student with RegNo " + studentRegNo + " not found"));

                Module module = moduleRepository.findByModuleCode(moduleCode)
                        .orElseThrow(() -> new RuntimeException("Module with code " + moduleCode + " not found"));

                Result result = new Result(marks, grade, student, module);
                resultsToSave.add(result);
            }

            resultRepository.saveAll(resultsToSave);
        } catch (Exception e) {
            throw new RuntimeException("Error processing CSV file: " + e.getMessage(), e);
        }
    }
}
