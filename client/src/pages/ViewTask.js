import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const ViewTask = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/tasks/${localStorage.getItem("username")}`
        );
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);

  // give me list of tasks in tailwind containing task, date, time, owner, and user
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="w-1/2 bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">{`Tasks -${localStorage.getItem(
          "username"
        )}`}</h1>

        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <ul>
              <li key={task._id} className="border-b border-gray-200 p-4">
                <h2 className="text-xl font-bold">{task.task}</h2>
                <p>Date: {task.date}</p>
                <p>Time: {task.time}</p>
                <p>Owner: {task.owner.username}</p>
                <p>User: {task.user}</p>
              </li>
            </ul>
          ))
        ) : (
          <p>No tasks assigned to you.</p>
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/addTask")}
      >
        Add Task
      </button>
      <button
        className="fixed top-5 right-5 p-3 bg-red-600 text-white rounded shadow"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          navigate("/");
          alert("Logged out successfully");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ViewTask;
