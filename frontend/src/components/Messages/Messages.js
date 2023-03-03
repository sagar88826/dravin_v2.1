import React from 'react';
import './Messages.css';
import SideMenu from '../SideMenu/SideMenu';

export default function Messages() {
  return (
    <>
      <SideMenu />
      <div className="container-msg">
        <div className="user-tab">
          <div className="user-header">
            <p>Messages</p>
            <i className="bi bi-gear-fill"></i>
          </div>
          <div className="search-bar">
            <input
              className="search-bar-component"
              type="text"
              placeholder="Search"
            />
            <i className="bi bi-search"></i>
          </div>
          <div className="user-name">
            <div className="dp">
              <img src="images/sidebar/avatar.jpg" alt="" />
            </div>
            <div className="content">
              <p className="Name">Dillin Nair</p>
              <p className="R-msg">Rescent Message</p>
            </div>
          </div>
          <div className="user-name">
            <div className="dp">
              <img src="images/sidebar/avatar.jpg" alt="" />
            </div>
            <div className="content">
              <p className="Name">Dillin Nair</p>
              <p className="R-msg">Rescent Message</p>
            </div>
          </div>
          <div className="user-name">
            <div className="dp">
              <img src="images/sidebar/avatar.jpg" alt="" />
            </div>
            <div className="content">
              <p className="Name">Dillin Nair</p>
              <p className="R-msg">Rescent Message</p>
            </div>
          </div>
          <div className="user-name">
            <div className="dp">
              <img src="images/sidebar/avatar.jpg" alt="" />
            </div>
            <div className="content">
              <p className="Name">Dillin Nair</p>
              <p className="R-msg">Recent Message</p>
            </div>
          </div>
        </div>
        <div className="chat-tab">
          <div className="friend-header">
            <div className="friend-header-img">
              <img src="images/sidebar/avatar.jpg" alt="" />
            </div>
            <div className="name">
              <p className="friend-header-name">Dillin Nair</p>
            </div>
          </div>
          <div className="chat-window"></div>
          <div className="chat-footer">
            <div className="msg-box">
              <input type="text" name="" id="" placeholder="Start Typing ..." />
              <div className="upload-img">
                <i className="bi bi-paperclip"></i>
              </div>
            </div>

            <div className="send-msg">
              <i className="bi bi-send-fill"></i>
            </div>
          </div>
        </div>
      </div></>
  );
}
