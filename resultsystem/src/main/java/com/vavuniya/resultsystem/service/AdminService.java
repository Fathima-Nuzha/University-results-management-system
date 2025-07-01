package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.model.Admin;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface AdminService {
    Admin createAdmin(Admin admin);
    List<Admin> getAllAdmins();
    Optional<Admin> getAdminById(Long id);
    Admin updateAdmin(Long id, Admin admin);
    void deleteAdmin(Long id);
    void bulkUploadAdmins(MultipartFile file);
}
