import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // ✅ Updated

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (taskData: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (
  id: number,
  updatedData: Partial<Task>
): Promise<Task> => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, updatedData);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
