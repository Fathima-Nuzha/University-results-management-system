package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.dto.ModuleDTO;

import java.util.List;

public interface ModuleService {
    ModuleDTO createModule(ModuleDTO dto);
    ModuleDTO updateModule(Long id, ModuleDTO dto);
    void deleteModule(Long id);
    List<ModuleDTO> getAllModules();
    ModuleDTO getModuleById(Long id);
    void bulkUploadModules(List<ModuleDTO> moduleDTOs);
}
