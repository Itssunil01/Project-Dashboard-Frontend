import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/taskService";
import { useAppSelector, useAppDispatch } from "../../features/Store";
import { logout } from "../../features/authSlice";

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const fetchTasks = () => {
    getTasks().then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    if (!title) return;
    await createTask(title);
    setTitle("");
    fetchTasks();
  };

  const handleUpdate = async (id: string) => {
    await updateTask(id, "DONE");
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

 return (
  <div className="min-h-screen bg-gray-100 p-6">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 mx-auto">
        Dashboard
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>

    {/* CENTER WRAPPER */}
    <div className="flex flex-col items-center">

      {/* ADD TASK (ADMIN) */}
      {user?.role === "ADMIN" && (
        <div className="w-full max-w-md mb-6">
          
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 👇 BUTTON BELOW INPUT */}
          <button
            onClick={handleCreate}
            className="w-40 mt-3 ml-34 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
        </div>
      )}

      {/* TASK GRID */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-xl p-4 border"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {task.title}
            </h2>

            <p
              className={`mt-2 text-sm font-medium ${
                task.status === "DONE"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              Status: {task.status}
            </p>

            <div className="flex gap-2 mt-4">

              {/* DONE */}
              {task.status !== "DONE" && (
                <button
                  onClick={() => handleUpdate(task.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Done
                </button>
              )}

              {/* DELETE */}
              {user?.role === "ADMIN" && (
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);
}