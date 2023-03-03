import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

function Login() {
  let navigate = useNavigate()
  const [data, setData] = useState({
    email: "", password: ""
  })

  const submitChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    console.log(name)
    setData({ ...data, [name]: value })
  }

  const clickSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const loginResponse = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })
      const message = await loginResponse.json()
      window.alert(message.status)
      navigate("/mainfeed")
    } catch (err) {
      const error = await err.json()
      console.log(error.message)
    }

  }

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
            <input id="email" name="email" value={data.email} onChange={submitChange}></input>
          </div>
        </div>
        <div className="Login-box__form-content">
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input id="password" name="password" value={data.password} onChange={submitChange}></input>
          </div>
        </div>

        <button type="submit" className="btn-login">Login</button>

        <p className="text-login">
          Don't have account <Link to='/'><a href="/">Register</a></Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
