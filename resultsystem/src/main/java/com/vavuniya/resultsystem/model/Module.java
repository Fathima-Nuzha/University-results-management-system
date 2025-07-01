package com.vavuniya.resultsystem.model;

import jakarta.persistence.*;

@Entity
@Table(name = "modules")
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String moduleCode;

    @Column(nullable = false)
    private String moduleName;

    @Column(nullable = false)
    private Integer semester;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    // Constructors
    public Module() {}

    public Module(String moduleCode, String moduleName, Integer semester, Course course) {
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
        this.semester = semester;
        this.course = course;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }
    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
