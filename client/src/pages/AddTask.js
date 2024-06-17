import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AddTask = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const initialFormState = {
    owner: localStorage.getItem("username"),
    task: "",
    date: "",
    time: "",
    user: "",
  };

  const [formState, setFormState] = useState(initialFormState); // [1]
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        alert("Task added successfully");
        e.target.reset();
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/users");
        const data = await response.json();
        setUsers(data);
        // add empty option to select
        setUsers([{ id: "", username: "" }, ...data]);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    // give me a form to add a task in tailwind
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        className="w-1/3 bg-white p-8 rounded-lg shadow-lg"
        onChange={handleChange}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {`Add Task - ${localStorage.getItem("username")}`}
        </h2>
        <div className="mb-5">
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-600"
          >
            Task
          </label>
          <input
            type="text"
            name="task"
            id="task"
            placeholder="Enter Task"
            className="block w-full p-3 rounded bg-gray-100 border border-transparent focus:outline-none focus:border-gray-400 focus:bg-white"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-600"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="block w-full p-3 rounded bg-gray-100 border border-transparent focus:outline-none focus:border-gray-400 focus:bg-white"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-600"
          >
            Time
          </label>
          <input
            type="time"
            name="time"
            id="time"
            className="block w-full p-3 rounded bg-gray-100 border border-transparent focus:outline-none focus:border-gray-400 focus:bg-white"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-600"
          >
            User
          </label>
          <select
            name="user"
            id="user"
            className="block w-full p-3 rounded bg-gray-100 border border-transparent focus:outline-none focus:border-gray-400 focus:bg-white"
          >
            {users.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button
          className="w-full p-3 mt-4 bg-indigo-600 text-white rounded shadow"
          onClick={addTask}
        >
          Add Task
        </button>
      </form>

      <button
        className="fixed top-16 right-5 p-3 bg-green-600 text-white rounded shadow"
        onClick={() => navigate("/viewTasks")}
      >
        View Tasks
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

export default AddTask;
