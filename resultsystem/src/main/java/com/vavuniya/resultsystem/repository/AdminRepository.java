package com.vavuniya.resultsystem.repository;

import com.vavuniya.resultsystem.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}
