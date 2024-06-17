// src/App.js
import React, { useState } from "react";
import AddTask from "./pages/AddTask";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import ViewTask from "./pages/ViewTask";

function App() {
  const [token, setToken] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<LoginPage setToken={setToken} />} />
            <Route path="/addTask" element={<AddTask token={token} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/viewTasks" element={<ViewTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
