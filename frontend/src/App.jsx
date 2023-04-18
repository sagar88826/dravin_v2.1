import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Mainfeed from "./components/mainfeed/MainFeed";
import VideoMeet from "./components/videomeeting/VideoMeet";
import Messages from "./components/Messages/Messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./components/search/Search";
import Profile from "./components/profile/Profile";
import { getUser } from "./redux/features/user/userSlice";
import { followeePost } from "./redux/features/post/postSlice";
function App() {
  const navigate = useNavigate()

  const user = useSelector(state => state.users)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log("getUser dispatched at app.js")
    dispatch(getUser())
  }, [user.isAuthenticated])

  return (
    <>
      <Routes>
        <Route path="/" element={user.isAuthenticated ? <Mainfeed /> : <Login />} />
        <Route path="register" element={user.isAuthenticated ? <Mainfeed /> : <Register />} />
        <Route path="videomeet" element={user.isAuthenticated ? <VideoMeet /> : <Login />} />
        <Route path="message" element={user.isAuthenticated ? <Messages /> : <Login />} />
        <Route path="search" element={user.isAuthenticated ? <Search /> : <Login />} />
        <Route path="profile" element={user.isAuthenticated ? <Profile /> : <Login />} />
      </Routes>
    </>
  );
}

export default App;
