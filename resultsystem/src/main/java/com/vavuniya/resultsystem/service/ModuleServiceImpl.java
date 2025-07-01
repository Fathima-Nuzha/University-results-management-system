package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.ModuleDTO;
import com.vavuniya.resultsystem.model.Course;
import com.vavuniya.resultsystem.model.Module;
import com.vavuniya.resultsystem.repository.CourseRepository;
import com.vavuniya.resultsystem.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleServiceImpl implements ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private CourseRepository courseRepository;

    private ModuleDTO toDTO(Module module) {
        ModuleDTO dto = new ModuleDTO();
        dto.setId(module.getId());
        dto.setModuleCode(module.getModuleCode());
        dto.setModuleName(module.getModuleName());
        dto.setSemester(module.getSemester());
        if (module.getCourse() != null) {
            dto.setCourseId(module.getCourse().getId());
        }
        return dto;
    }

    private Module toEntity(ModuleDTO dto) {
        Module module = new Module();
        module.setModuleCode(dto.getModuleCode());
        module.setModuleName(dto.getModuleName());
        module.setSemester(dto.getSemester());
        if (dto.getCourseId() != null) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            module.setCourse(course);
        }
        return module;
    }

    @Override
    public ModuleDTO createModule(ModuleDTO dto) {
        Module module = toEntity(dto);
        return toDTO(moduleRepository.save(module));
    }

    @Override
    public ModuleDTO updateModule(Long id, ModuleDTO dto) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Module not found"));
        module.setModuleCode(dto.getModuleCode());
        module.setModuleName(dto.getModuleName());
        module.setSemester(dto.getSemester());
        if (dto.getCourseId() != null) {
            Course course = courseRepository.findById(dto.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Course not found"));
            module.setCourse(course);
        }
        return toDTO(moduleRepository.save(module));
    }

    @Override
    public void deleteModule(Long id) {
        moduleRepository.deleteById(id);
    }

    @Override
    public List<ModuleDTO> getAllModules() {
        return moduleRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public ModuleDTO getModuleById(Long id) {
        return moduleRepository.findById(id).map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Module not found"));
    }

    @Override
    public void bulkUploadModules(List<ModuleDTO> moduleDTOs) {
        for (ModuleDTO dto : moduleDTOs) {
            boolean exists = moduleRepository.findByModuleCode(dto.getModuleCode()).isPresent();
            if (!exists) {
                Module module = toEntity(dto);
                moduleRepository.save(module);
            }
        }
    }
}
