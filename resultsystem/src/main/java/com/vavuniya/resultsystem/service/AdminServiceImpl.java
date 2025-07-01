package com.vavuniya.resultsystem.service;

import com.vavuniya.resultsystem.model.Admin;
import com.vavuniya.resultsystem.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Admin createAdmin(Admin admin) {
        // Encode password before saving
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            admin.setUsername(updatedAdmin.getUsername());
            admin.setEmail(updatedAdmin.getEmail());
            if (updatedAdmin.getPassword() != null && !updatedAdmin.getPassword().isEmpty()) {
                admin.setPassword(passwordEncoder.encode(updatedAdmin.getPassword()));
            }
            return adminRepository.save(admin);
        }).orElse(null);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public void bulkUploadAdmins(MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            List<Admin> admins = new ArrayList<>();
            boolean isFirstLine = true;

            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false; // Skip CSV header
                    continue;
                }

                String[] data = line.split(",");
                if (data.length >= 3) {
                    Admin admin = new Admin();
                    admin.setUsername(data[0].trim());
                    admin.setEmail(data[1].trim());
                    admin.setPassword(passwordEncoder.encode(data[2].trim()));
                    admins.add(admin);
                }
            }
            adminRepository.saveAll(admins);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage(), e);
        }
    }
}
