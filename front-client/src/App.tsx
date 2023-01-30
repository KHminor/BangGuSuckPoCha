import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import SignUp from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import Loading from "./components/Common/Loading";
import GameRoom from "./components/GameRoom/GameRoom";
import StoryRoom from "./components/StoryRoom/StoryRoom";
import RoomUserProfile from "./components/Common/RoomUserProfile";
function App() {
  return (
    <div className="App bg-black">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />       
        <Route path="/loading" element={<Loading />} />       
        <Route path="/gameroom" element={<GameRoom />} />       
        <Route path="/storyroom" element={<StoryRoom />} />       
        <Route path="/userprofile" element={<RoomUserProfile />} />       
      </Routes>
    </div>
  );
}

export default App;
