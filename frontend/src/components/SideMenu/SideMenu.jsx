import React from 'react';
import './sideMenu.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/features/user/userSlice';
function SideMenu(props) {
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const click = () => {
    dispatch(logoutUser())
  }
  return (
    <>
      {/* Toggle Button For Dark Mode  */}
      <div className="toggle-menu">
        <div className={`toggle-mode ${props.theme}`} onClick={props.toggleButton} theme={props.theme}>
          {/* {props.theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill "></i>} */}
          <i className="bi bi-power power" onClick={click}></i>
        </div>
      </div>

      {/* Toggle Button For Dark Mode Ends Here  */}

      {/* Side Menu Container  */}

      <div className={`side-menu setTop-${props.theme} }`}>
        {/* top Section */}

        <div className="top-section">
          <div className="logo">
            <img src='images/logo.png' alt="logo does not load" />
          </div>
          <div className="l-name">
            <p>dravin</p>
          </div>
        </div>

        {/* Divider  */}

        <div className="Divider"></div>

        {/* Menu Bar  */}

        <div className="main-menu">
          <Link to="/">
            <li>
              <div className="home-icon">
                <i className="bi bi-house"></i>
                <h4 className={`menu-name ${props.theme}`}>Home</h4>
              </div>
            </li>
          </Link>
        </div>
        {/* <div className="main-menu">
          <Link to="/videomeet">
            <div className="home-icon">
              <i className="bi bi-camera-video"></i>

              <h4 className={`menu-name ${props.theme}`}>Video Call</h4>
            </div>
          </Link>
        </div>
        <div className="main-menu">
          <Link to="/Message">
            <div className="home-icon">
              <i className="bi bi-chat-left"></i>
              <h4 className={`menu-name ${props.theme}`}>Message</h4>
            </div>
          </Link>
        </div> */}
        <div className="main-menu">
          <Link to="/search">
            <div className="home-icon">
              <i className="bi bi-search"></i>
              <h4 className={`menu-name ${props.theme}`}>Search</h4>
            </div>
          </Link>
        </div>
        <div className="main-menu">
          <Link to="/mypost">
            <div className="home-icon">
              <i className="bi bi-file-post"></i>
              <h4 className={`menu-name ${props.theme}`}>My post</h4>
            </div>
          </Link>
        </div>

        {/* Footer For Login Icon */}

        <div className={`sidebar-footer`}>
          <div className="avatar">
            {user.owner.avatar ? <img src={user.owner.avatar.url} alt="s" /> : <img src="images/sidebar/profile-image.jpg" alt="profile-image" />}
          </div>
          <div className="user-info">
            <Link to={"/profile"}>
              <h5>{user.owner.username}</h5>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SideMenu;
