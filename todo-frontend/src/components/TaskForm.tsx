import React, { useState } from "react";
import { createTask, Task } from "../api/todoApi";

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Omit<Task, "id"> = { title, description, status };

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
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <button type="submit"> Add Task </button>
    </form>
  );
};

export default TaskForm;
