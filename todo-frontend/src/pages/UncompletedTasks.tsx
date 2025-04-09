import { useState } from "react";
import TaskForm from "../components/TaskForm.tsx";
import TaskList from "../components/TaskList.tsx";

const UncompletedTasks = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleTaskAdded = () => {
    setRefreshTrigger((prev) => !prev);
  };

  const refreshTasks = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="uncompletedTasks">
      <h1>Uncompleted Tasks</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList
        refreshTrigger={refreshTrigger}
        filterByTaskType="pending"
        onRefreshTasks={refreshTasks}
      />
    </div>
  );
};

export default UncompletedTasks;
