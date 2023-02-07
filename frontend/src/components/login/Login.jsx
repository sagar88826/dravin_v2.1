import React from "react";
import "./Login.css";

function Login() {



  return (
    <div className="Login-box">
      <img src="images/logo.png" alt="logo"></img>
      <h1 className="Login-box__header">Login</h1>
      <form>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="username">Username</label>
          </div>
          <div>
            <input id="username"></input>
          </div>
        </div>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input id="password"></input>
          </div>
        </div>

        <button className="btn-login">Login</button>

        <p className="text-login">
          Don't have account <a href="/">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
