package com.vavuniya.resultsystem.util;

import com.vavuniya.resultsystem.model.Admin;
import com.vavuniya.resultsystem.model.Student;
import com.vavuniya.resultsystem.repository.AdminRepository;
import com.vavuniya.resultsystem.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PasswordHasher implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        hashAdminPasswords();
        hashStudentPasswords();
    }

    private void hashAdminPasswords() {
        List<Admin> admins = adminRepository.findAll();
        boolean updated = false;
        for (Admin admin : admins) {
            String pwd = admin.getPassword();

            // Check if password already hashed (assuming BCrypt hash starts with $2a$ or $2b$)
            if (pwd != null && !(pwd.startsWith("$2a$") || pwd.startsWith("$2b$"))) {
                String hashed = passwordEncoder.encode(pwd);
                admin.setPassword(hashed);
                updated = true;
            }
        }
        if (updated) {
            adminRepository.saveAll(admins);
            System.out.println("Admin passwords hashed successfully.");
        } else {
            System.out.println("No admin passwords needed hashing.");
        }
    }

    private void hashStudentPasswords() {
        List<Student> students = studentRepository.findAll();
        boolean updated = false;
        for (Student student : students) {
            String pwd = student.getPassword();

            if (pwd != null && !(pwd.startsWith("$2a$") || pwd.startsWith("$2b$"))) {
                String hashed = passwordEncoder.encode(pwd);
                student.setPassword(hashed);
                updated = true;
            }
        }
        if (updated) {
            studentRepository.saveAll(students);
            System.out.println("Student passwords hashed successfully.");
        } else {
            System.out.println("No student passwords needed hashing.");
        }
    }
}
