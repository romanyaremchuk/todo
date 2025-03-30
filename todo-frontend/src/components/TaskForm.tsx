import React, { useState } from "react";
import { createTask, Task, TaskStatus } from "../api/todoApi";
import "./TaskForm.css";

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Omit<Task, "id"> = { title, description, status };

    console.log("New task created:", newTask);
    try {
      await createTask(newTask);
      onTaskAdded();
      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <input
        className="Input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select
        className="Select"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className="Button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
