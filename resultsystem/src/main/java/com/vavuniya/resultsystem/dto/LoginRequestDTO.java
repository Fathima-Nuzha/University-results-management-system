package com.vavuniya.resultsystem.dto;

public class LoginRequestDTO {
    private String usernameOrRegNo;
    private String password;

    // Getters and Setters
    public String getUsernameOrRegNo() {
        return usernameOrRegNo;
    }

    public void setUsernameOrRegNo(String usernameOrRegNo) {
        this.usernameOrRegNo = usernameOrRegNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
