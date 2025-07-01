package com.vavuniya.resultsystem.security;

import com.vavuniya.resultsystem.model.Admin;
import com.vavuniya.resultsystem.model.Student;
import com.vavuniya.resultsystem.repository.AdminRepository;
import com.vavuniya.resultsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUsername(username);
        if (admin != null) {
            return new User(
                    admin.getUsername(),
                    admin.getPassword(),
                    Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
            );
        }

        return studentRepository.findByRegNo(username)
                .map(student -> new User(
                        student.getRegNo(),
                        student.getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_STUDENT"))
                ))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username or regNo: " + username));
    }

}
