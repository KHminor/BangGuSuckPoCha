import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./components/Main/Main";
import SignUp from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import MainCreateRoom from "./components/Main/MainCreateRoom";
import Navbar from "./components/Common/Nav";
function App() {
  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "rgb(25, 25, 25)" }}>
        <div className="App container mx-auto">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Routes>
        <Route path="/create" element={<MainCreateRoom />} />
      </Routes>
      {/* <div className="bg-black">
        <Routes>
          <Route path="/create" element={<MainCreateRoom />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <div style={{backgroundColor: 'rgb(25, 25, 25)'}}>
        <Routes>
          <Route path="/" element={<Main />} />

        </Routes>
      </div> */}
    </>
  );
}

export default App;
