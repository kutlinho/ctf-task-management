import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    var response;
    try {
      response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      console.log(response);
      alert("Registration successful");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <h2>Register New User</h2>
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
      <button onClick={handleRegister}>Register</button>

      <h4 className="underline" onClick={() => navigate("/")}>
        Click here to Login Page
      </h4>
    </div>
  );
};

export default Register;
