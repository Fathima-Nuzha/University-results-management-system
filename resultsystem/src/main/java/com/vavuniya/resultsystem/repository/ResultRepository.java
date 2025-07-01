package com.vavuniya.resultsystem.repository;

import com.vavuniya.resultsystem.model.Result;
import com.vavuniya.resultsystem.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByStudent(Student student);
}
