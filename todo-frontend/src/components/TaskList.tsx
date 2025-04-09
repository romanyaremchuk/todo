import React, { useEffect, useState } from "react";
import { getTasks, Task } from "../api/todoApi";
import TaskItem from "./TaskItem";
import "./TaskList.css";

interface TaskListProps {
  refreshTrigger: boolean;
  filterByTaskType: string;
  onRefreshTasks: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  refreshTrigger,
  filterByTaskType,
  onRefreshTasks,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then((fetchedTasks) => {
        setTasks(() => {
          if (!Array.isArray(fetchedTasks)) {
            return [];
          }

          if (filterByTaskType.length === 0) {
            return fetchedTasks;
          }

          return fetchedTasks.filter((t) => t.status === filterByTaskType);
        });
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]); // prevents crashing on errors
      });
  }, [refreshTrigger]);

  return (
    <div className="TaskList">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refreshTasks={onRefreshTasks} />
      ))}
    </div>
  );
};

export default TaskList;
