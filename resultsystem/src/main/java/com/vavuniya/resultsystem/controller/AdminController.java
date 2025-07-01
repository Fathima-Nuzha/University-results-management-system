package com.vavuniya.resultsystem.controller;

import com.vavuniya.resultsystem.model.Admin;
import com.vavuniya.resultsystem.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        if (admin.getUsername() == null || admin.getUsername().isEmpty()) {
            return ResponseEntity.badRequest().body("Username is required");
        }
        if (admin.getEmail() == null || admin.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        if (admin.getPassword() == null || admin.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }

        Admin savedAdmin = adminService.createAdmin(admin);
        return ResponseEntity.ok(savedAdmin);
    }

}
