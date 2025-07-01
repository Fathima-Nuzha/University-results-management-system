package com.vavuniya.resultsystem.repository;

import com.vavuniya.resultsystem.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    Optional<Module> findByModuleCode(String moduleCode);
}
