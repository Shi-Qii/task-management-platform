package com.taskplatform.backend.dto;

import com.taskplatform.backend.entity.Task;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.time.Instant;

// [AI assisted - backend.md #5]
@Getter
public class TaskResponse {

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private final Long id;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private final String title;

    @Schema(nullable = true)
    private final String description;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private final boolean completed;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
    private final Instant createdAt;

    @Schema(requiredMode = Schema.RequiredMode.REQUIRED)
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
