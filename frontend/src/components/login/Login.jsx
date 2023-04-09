import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const setChangedValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };

  const submitClicked = async (e) => {


  };

  return (
    <div className="Login-box">
      <img src="images/logo.png" alt="logo"></img>
      <h1 className="Login-box__header">Login</h1>
      <form onSubmit={submitClicked}>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              id="email"
              name="email"
              value={data.email}
              onChange={setChangedValue}
            ></input>
          </div>
        </div>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              id="password"
              name="password"
              value={data.password}
              onChange={setChangedValue}
            ></input>
          </div>
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>

        <p className="text-login">
          Don't have account
          <Link to="/">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
