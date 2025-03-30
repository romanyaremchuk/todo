import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { useState } from "react";
import "./App.css";

function App() {
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleTaskAdded = () => {
    setRefreshTasks((prev) => !prev);
  };

  return (
    <div className="App">
      <h1 className="App-header"> My TODO App</h1>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList refreshTrigger={refreshTasks} />
    </div>
  );
}

export default App;
