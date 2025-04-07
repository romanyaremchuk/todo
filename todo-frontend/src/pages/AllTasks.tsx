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
      <h1>All tasks</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList refreshTrigger={refreshTasks} />
    </div>
  );
};

export default AllTasks;
