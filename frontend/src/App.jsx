import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Mainfeed from "./components/mainfeed/MainFeed";
import VideoMeet from "./components/videomeeting/VideoMeet";
import Messages from "./components/Messages/Messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingUserAction } from "./redux/action/userAction";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingUserAction());
  }, [dispatch, loadingUserAction]);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Mainfeed /> : <Register />} />
        <Route path="login" element={<Login />} />
        <Route path="videomeet" element={<VideoMeet />} />
        <Route path="message" element={<Messages />} />
      </Routes>
    </>
  );
}

export default App;
