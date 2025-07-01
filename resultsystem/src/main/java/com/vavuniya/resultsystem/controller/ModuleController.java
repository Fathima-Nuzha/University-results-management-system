package com.vavuniya.resultsystem.controller;

import com.vavuniya.resultsystem.dto.ModuleDTO;
import com.vavuniya.resultsystem.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;

    @PostMapping
    public ResponseEntity<ModuleDTO> createModule(@RequestBody ModuleDTO dto) {
        return ResponseEntity.ok(moduleService.createModule(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuleDTO> updateModule(@PathVariable Long id, @RequestBody ModuleDTO dto) {
        return ResponseEntity.ok(moduleService.updateModule(id, dto));
    }

    @GetMapping
    public ResponseEntity<List<ModuleDTO>> getAllModules() {
        return ResponseEntity.ok(moduleService.getAllModules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleDTO> getModuleById(@PathVariable Long id) {
        return ResponseEntity.ok(moduleService.getModuleById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable Long id) {
        moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadModulesCsv(@RequestParam("file") MultipartFile file) {
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<ModuleDTO> modules = new ArrayList<>();
            String line;
            boolean isFirstLine = true;
            while ((line = br.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // skip header
                    continue;
                }
                if (!line.trim().isEmpty()) {
                    // CSV columns: moduleCode,moduleName,semester,courseId
                    String[] parts = line.split(",");
                    if (parts.length >= 4) {
                        ModuleDTO dto = new ModuleDTO();
                        dto.setModuleCode(parts[0].trim());
                        dto.setModuleName(parts[1].trim());
                        dto.setSemester(Integer.parseInt(parts[2].trim()));
                        dto.setCourseId(Long.parseLong(parts[3].trim()));
                        modules.add(dto);
                    }
                }
            }
            moduleService.bulkUploadModules(modules);
            return ResponseEntity.ok("Modules uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading modules: " + e.getMessage());
        }
    }
}
