package com.vavuniya.resultsystem.dto;

public class ModuleDTO {
    private Long id;
    private String moduleCode;
    private String moduleName;
    private Integer semester;
    private Long courseId;

    public ModuleDTO() {}

    public ModuleDTO(Long id, String moduleCode, String moduleName, Integer semester, Long courseId) {
        this.id = id;
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
        this.semester = semester;
        this.courseId = courseId;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }
    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }
}
