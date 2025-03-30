import React from "react";
import { Task } from "../api/todoApi";
import "./TaskItem.css";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <div className="TaskItem">
      <strong>{task.title}</strong>
      <p className="Description">
        <strong>Description: </strong> {task.description}
      </p>
      <span>
        <strong>Status: </strong>
        {task.status}
      </span>
      {/* TODO add buttons edit delete etc here (hehe todo in todo app)*/}
    </div>
  );
};

export default TaskItem;
