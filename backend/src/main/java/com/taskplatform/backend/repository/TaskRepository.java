package com.taskplatform.backend.repository;

import com.taskplatform.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

// [AI assisted - backend.md #1]
public interface TaskRepository extends JpaRepository<Task, Long> {
}
