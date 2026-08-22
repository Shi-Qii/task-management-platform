package com.taskplatform.backend.repository;

import com.taskplatform.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// [AI assisted - backend.md #1]
public interface TaskRepository extends JpaRepository<Task, Long> {

    // [AI assisted - backend.md #6]
    List<Task> findAllByOrderByCreatedAtAsc();
}
