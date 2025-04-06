//import TaskList from "./components/TaskList";
//import TaskForm from "./components/TaskForm";
//import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  // const [refreshTasks, setRefreshTasks] = useState(false);
  //
  // const handleTaskAdded = () => {
  //   setRefreshTasks((prev) => !prev);
  // };

  return (
    // <div className="App">
    //   <h1 className="App-header"> My TODO App</h1>
    //   <TaskForm onTaskAdded={handleTaskAdded} />
    //   <TaskList refreshTrigger={refreshTasks} />
    // </div>
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="#" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
