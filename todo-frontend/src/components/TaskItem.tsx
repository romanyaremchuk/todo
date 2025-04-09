import React from "react";
import { Task, TaskStatus, updateTask } from "../api/todoApi";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
  refreshTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, refreshTasks }) => {
  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newStatus = e.target.value as TaskStatus;
    try {
      console.log(newStatus);
      console.log(task);
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        status: newStatus,
      });
      refreshTasks();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="TaskItem">
      <strong>{task.title}</strong>
      <p className="Description">
        <strong>Description: </strong>
        {task.description.length > 30
          ? task.description.slice(0, 30) + "..."
          : task.description}
      </p>
      <p>
        <strong>Status: </strong>
        {task.status}
      </p>
      <select
        className="Select"
        value={task.status}
        onChange={handleStatusChange}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      {/* TODO add buttons edit delete etc here (hehe todo in todo app)*/}
    </div>
  );
};

export default TaskItem;
