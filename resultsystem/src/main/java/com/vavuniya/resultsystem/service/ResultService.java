package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.ResultDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ResultService {
    ResultDTO createResult(ResultDTO dto);
    ResultDTO updateResult(Long id, ResultDTO dto);
    void deleteResult(Long id);
    List<ResultDTO> getAllResults();
    ResultDTO getResultById(Long id);
    void bulkUploadResults(List<ResultDTO> results);
    void uploadResultsFromCsv(MultipartFile file) throws Exception;
}
