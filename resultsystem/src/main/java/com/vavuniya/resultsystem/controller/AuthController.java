package com.vavuniya.resultsystem.controller;

import com.vavuniya.resultsystem.dto.LoginRequestDTO;
import com.vavuniya.resultsystem.dto.LoginResponseDTO;
import com.vavuniya.resultsystem.model.Admin;
import com.vavuniya.resultsystem.model.Student;
import com.vavuniya.resultsystem.repository.AdminRepository;
import com.vavuniya.resultsystem.repository.StudentRepository;
import com.vavuniya.resultsystem.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService customUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        try {
            String name = request.getUsernameOrRegNo();

            // Authenticate user (username or regNo)
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(name, request.getPassword())
            );

            // Load UserDetails for JWT token generation
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(name);

            String token = jwtUtil.generateToken(userDetails);

            // Determine role based on username or regNo
            String role = null;
            Admin admin = adminRepository.findByUsername(name);
            if (admin != null) {
                role = "admin";
            } else {
                Student student = studentRepository.findByRegNo(name)
                        .orElseThrow(() -> new RuntimeException("Student with RegNo " + name + " not found"));

                if (student != null) {
                    role = "student";
                }
            }

            // Build response
            LoginResponseDTO response = new LoginResponseDTO();
            response.setToken(token);
            response.setRole(role);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username/registration number or password");
        }
    }
}
