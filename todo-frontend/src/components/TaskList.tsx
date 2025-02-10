import React, { useEffect, useState } from "react";
import { getTasks, Task } from "../api/todoApi";
import TaskItem from "./TaskItem";

interface TaskListProps {
  refreshTrigger: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then((fetchedTasks) => {
        console.log("Fetched tasks:", fetchedTasks); // Debug API response
        setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []); // Ensure it's an array
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Prevent crashing on errors
      });
  }, [refreshTrigger]);

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
