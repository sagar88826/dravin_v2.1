import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Mainfeed from "./components/mainfeed/MainFeed";
import VideoMeet from "./components/videomeeting/VideoMeet";
import Messages from "./components/Messages/Messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="videomeet" element={<VideoMeet />} />
        <Route path="message" element={<Messages />} />
        <Route path="mainfeed" element={<Mainfeed />} />
      </Routes>
    </>
  );
}

export default App;
