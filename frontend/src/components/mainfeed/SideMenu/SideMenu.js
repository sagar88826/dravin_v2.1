import React from 'react';
import './sideMenu.css';
import { Link } from 'react-router-dom';

function SideMenu(props) {
  return (
    <>
      {/* Toggle Button For Dark Mode  */}
      <div className="toggle-menu">
        <div
          className={`toggle-mode ${props.theme}`}
          onClick={props.toggleButton}
          theme={props.theme}
        >
          {props.theme === 'light' ? (
            <i className="bi bi-moon-fill"></i>
          ) : (
            <i className="bi bi-sun-fill "></i>
          )}
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
          <Link to="/mainfeed">
            <li>
              <div className="home-icon">
                <i className="bi bi-house"></i>
                <h4 className={`menu-name ${props.theme}`}>Home</h4>
              </div>
            </li>
          </Link>
        </div>
        <div className="main-menu">
          <Link to="/VideoCall">
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
        </div>

        {/* Footer For Login Icon */}

        <div className={`sidebar-footer ${props.theme}`}>
          <div className="avatar">
            <img src="images/sidebar/avatar.jpg" alt="" />
          </div>
          <div className={`user-info ${props.theme}`}>
            <h5>Dillin Nair</h5>
            <p>Dillinnair@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default SideMenu;
