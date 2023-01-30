import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SignUp from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import MainCreateRoom from "./components/Main/MainCreateRoom";
import LayoutPage from "./components/Common/LayoutPage";
import Loading from "./components/Common/Loading";
import MainCreateRoomCarousel from "./components/Main/MainCreateRoomCarousel";

import AdminMain from "./components/Admin/AdminMain";
import AdminLogin from "./components/Admin/AdminLogin";

import GameRoom from "./components/GameRoom/GameRoom";

function App() {
  return (
    <div className="App bg-black">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/carousel" element={<MainCreateRoomCarousel />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminmain" element={<AdminMain />} />
        <Route path="/gameroom" element={<GameRoom />} />
      </Routes>
    </div>
  );
}

export default App;
