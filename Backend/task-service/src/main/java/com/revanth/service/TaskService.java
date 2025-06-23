package com.revanth.service;

import com.revanth.modal.Task;
import com.revanth.modal.TaskStatus;

import java.util.List;

public interface TaskService {
    Task createTask(Task task, String requestedRole) throws Exception;

    Task getTaskById(Long id) throws Exception;

    List<Task> getAllTask(TaskStatus status);

    Task uodateTask(Long id, Task updatedTask, Long userId) throws Exception;

    void deleteTask(Long id) throws Exception;

    Task assignedToUser(Long userId, Long taskId) throws Exception;

    List<Task> assignedUsersTask(Long userId, TaskStatus status);

    Task completeTask(Long taskId) throws Exception;
}
