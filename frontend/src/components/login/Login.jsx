import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingUserAction, loginAction } from "../../redux/action/userAction";

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const submitChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name);
    setData({ ...data, [name]: value });
  };

  const clickSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    await dispatch(loginAction(email, password));
    await dispatch(loadingUserAction());
  };

  return (
    <div className="Login-box">
      <img src="images/logo.png" alt="logo"></img>
      <h1 className="Login-box__header">Login</h1>
      <form onSubmit={clickSubmit}>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              id="email"
              name="email"
              value={data.email}
              onChange={submitChange}
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
              onChange={submitChange}
            ></input>
          </div>
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>

        <p className="text-login">
          Don't have account{" "}
          <Link to="/">
            <a href="/">Register</a>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
