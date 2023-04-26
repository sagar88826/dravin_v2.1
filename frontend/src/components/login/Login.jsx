import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetError } from "../../redux/features/user/userSlice";

function Login() {
  // redux
  const user = useSelector(state => state.users)
  const dispatch = useDispatch()
  // useEffect
  useEffect(() => {
    dispatch(resetError())
  }, [dispatch])
  // useState
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  // functions
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
        {user.loading ? <p>Loading...</p> : null}
        {user.error ? <p style={{ color: "red", fontSize: "15px" }}>{user.error}</p> : null}
        <p className="text-login">
          Don't have account <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
