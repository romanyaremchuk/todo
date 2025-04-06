import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { useState } from "react";

const AllTasks = () => {
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleTaskAdded = () => {
    setRefreshTasks((prev) => !prev);
  };

  return (
    <div className="allTasks">
      <div className="tasksWrapper">
        <h1 className="header">All tasks</h1>
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList refreshTrigger={refreshTasks} />
      </div>
    </div>
  );
};

export default AllTasks;
