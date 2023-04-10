import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/features/user/userSlice";

function Login() {
  const user = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault()
    dispatch(loginUser(data))
  };

  return (
    <div className="Login-box">
      <img src="images/logo.png" alt="logo"></img>
      <h1 className="Login-box__header">Login</h1>
      <form onSubmit={submit}>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <input
              id="email"
              name="email"
              value={data.email}
              onChange={changeValue}
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
              onChange={changeValue}
            ></input>
          </div>
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>
        {/* { user.isAuthenticated?n:} */}

        <p className="text-login">
          Don't have account
          <Link to="register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
