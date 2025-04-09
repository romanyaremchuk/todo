import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useState } from "react";

const AllTasks = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const refreshTasks = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <div className="allTasks">
      <h1>All tasks</h1>
      <TaskForm onTaskAdded={refreshTasks} />
      {/* Pass the toggler and the callback down */}
      <TaskList
        refreshTrigger={refreshTrigger}
        filterByTaskType=""
        onRefreshTasks={refreshTasks}
      />
    </div>
  );
};
export default AllTasks;
