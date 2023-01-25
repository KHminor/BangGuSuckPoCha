import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SignUp from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import MainCreateRoom from "./components/Main/MainCreateRoom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/create" element={<MainCreateRoom />} />
      </Routes>
    </div>
  );
}

export default App;
