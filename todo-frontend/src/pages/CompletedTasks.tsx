import { useState } from "react";
import TaskForm from "../components/TaskForm.tsx";
import TaskList from "../components/TaskList.tsx";

const CompletedTasks = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const handleTaskAdded = () => {
    setRefreshTrigger((prev) => !prev);
  };

  const refreshTasks = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="completedTasks">
      <h1>Completed Tasks</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList
        refreshTrigger={refreshTrigger}
        filterByTaskType="completed"
        onRefreshTasks={refreshTasks}
      />
    </div>
  );
};

export default CompletedTasks;
