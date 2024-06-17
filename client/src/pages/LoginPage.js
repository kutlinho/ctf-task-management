// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      console.log(response);
      setToken(response.data.token);
      navigate("/addTask");
      alert("Login successful");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <h4
        className="cursor-pointer underline"
        onClick={() => navigate("/register")}
      >
        Don't have account? Click here to register
      </h4>
    </div>
  );
};

export default LoginPage;
