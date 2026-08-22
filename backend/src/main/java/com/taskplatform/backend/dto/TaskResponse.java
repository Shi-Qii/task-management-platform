package com.taskplatform.backend.dto;

import com.taskplatform.backend.entity.Task;
import lombok.Getter;

import java.time.Instant;

@Getter
public class TaskResponse {

    private final Long id;
    private final String title;
    private final String description;
    private final boolean completed;
    private final Instant createdAt;
    private final Instant updatedAt;

    public TaskResponse(Task task) {
        this.id = task.getId();
        this.title = task.getTitle();
        this.description = task.getDescription();
        this.completed = task.isCompleted();
        this.createdAt = task.getCreatedAt();
        this.updatedAt = task.getUpdatedAt();
    }
}
