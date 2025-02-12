import React from "react";
import { Task } from "../api/todoApi";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <li>
      <strong>{task.title}</strong> - {task.description} -{" "}
      <span>{task.status}</span>
      {/* TODO add buttons edit delete etc here (hehe todo in todo app)*/}
    </li>
  );
};

export default TaskItem;
