package com.vavuniya.resultsystem.dto;

public class StudentDTO {
    private Long id;
    private String regNo;
    private String name;
    private String email;
    private String password; // store hashed password
    private Long courseId;

    public StudentDTO() {}

    public StudentDTO(Long id, String regNo, String name, String email, String password, Long courseId) {
        this.id = id;
        this.regNo = regNo;
        this.name = name;
        this.email = email;
        this.password = password;
        this.courseId = courseId;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRegNo() { return regNo; }
    public void setRegNo(String regNo) { this.regNo = regNo; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
}
