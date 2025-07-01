package com.vavuniya.resultsystem.dto;

public class ResultDTO {
    private Long id;
    private double marks;
    private String grade;
    private Long studentId;
    private Long moduleId;
    private String moduleCode;  // Add this field

    public ResultDTO() {}

    public ResultDTO(Long id, double marks, String grade, Long studentId, Long moduleId, String moduleCode) {
        this.id = id;
        this.marks = marks;
        this.grade = grade;
        this.studentId = studentId;
        this.moduleId = moduleId;
        this.moduleCode = moduleCode;
    }

    // getters and setters for all fields including moduleCode and id

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getMarks() { return marks; }
    public void setMarks(double marks) { this.marks = marks; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }
}
