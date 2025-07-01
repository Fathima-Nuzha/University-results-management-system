    package com.vavuniya.resultsystem.dto;
    
    import java.util.List;
    
    public class StudentResultDTO {
        private String regNo;
        private String name;
        private List<ResultDTO> results;
        private double cgpa;
    
        public StudentResultDTO() {}
    
        public StudentResultDTO(String regNo, String name, List<ResultDTO> results, double cgpa) {
            this.regNo = regNo;
            this.name = name;
            this.results = results;
            this.cgpa = cgpa;
        }
    
        // Getters and setters
        public String getRegNo() { return regNo; }
        public void setRegNo(String regNo) { this.regNo = regNo; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public List<ResultDTO> getResults() { return results; }
        public void setResults(List<ResultDTO> results) { this.results = results; }
        public double getCgpa() { return cgpa; }
        public void setCgpa(double cgpa) { this.cgpa = cgpa; }
    }
