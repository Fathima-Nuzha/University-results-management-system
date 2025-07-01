package com.vavuniya.resultsystem.controller;

import com.vavuniya.resultsystem.dto.ResultDTO;
import com.vavuniya.resultsystem.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping
    public ResponseEntity<ResultDTO> createResult(@RequestBody ResultDTO dto) {
        return ResponseEntity.ok(resultService.createResult(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResultDTO> updateResult(@PathVariable Long id, @RequestBody ResultDTO dto) {
        return ResponseEntity.ok(resultService.updateResult(id, dto));
    }

    @GetMapping
    public ResponseEntity<List<ResultDTO>> getAllResults() {
        return ResponseEntity.ok(resultService.getAllResults());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultDTO> getResultById(@PathVariable Long id) {
        return ResponseEntity.ok(resultService.getResultById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadResultsCsv(@RequestParam("file") MultipartFile file) {
        try {
            resultService.uploadResultsFromCsv(file);
            return ResponseEntity.ok("Results uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading results: " + e.getMessage());
        }
    }
}
