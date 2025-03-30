import React, { useEffect, useState } from "react";
import { getTasks, Task } from "../api/todoApi";
import TaskItem from "./TaskItem";
import "./TaskList.css";

interface TaskListProps {
  refreshTrigger: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then((fetchedTasks) => {
        setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]); // prevents crashing on errors
      });
  }, [refreshTrigger]);

  return (
    <div className="TaskList">
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
