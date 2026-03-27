import api from "./api";

export const getTasks = () => api.get("/tasks");

export const createTask = (title: string) =>
  api.post("/tasks", { title });

export const updateTask = (id: string, status: string) =>
  api.patch(`/tasks/${id}`, { status });

export const deleteTask = (id: string) =>
  api.delete(`/tasks/${id}`);