package com.taskplatform.backend.service;

import com.taskplatform.backend.dto.TaskRequest;
import com.taskplatform.backend.dto.TaskResponse;
import com.taskplatform.backend.entity.Task;
import com.taskplatform.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

// [AI assisted - backend.md #1]
@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;

    public List<TaskResponse> findAll() {
        return taskRepository.findAll().stream()
                .map(TaskResponse::new)
                .toList();
    }

    public TaskResponse findById(Long id) {
        return new TaskResponse(getTaskOrThrow(id));
    }

    public TaskResponse create(TaskRequest request) {
        Task task = new Task();
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        return new TaskResponse(taskRepository.save(task));
    }

    public TaskResponse update(Long id, TaskRequest request) {
        Task task = getTaskOrThrow(id);
        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        return new TaskResponse(taskRepository.save(task));
    }

    public TaskResponse toggleCompleted(Long id) {
        Task task = getTaskOrThrow(id);
        task.setCompleted(!task.isCompleted());
        return new TaskResponse(taskRepository.save(task));
    }

    public void delete(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task " + id + " not found");
        }
        taskRepository.deleteById(id);
    }

    private Task getTaskOrThrow(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task " + id + " not found"));
    }
}
