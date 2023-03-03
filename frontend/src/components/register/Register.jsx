import React, { useState } from 'react';
import '../login/Login.css';
import { Link } from 'react-router-dom';
function Register() {
    const [data, setData] = useState({
        username: "", email: "", password: "", cpassword: ""
    })
    const clickData = (e) => {
        const value = e.target.value
        const name = e.target.name
        setData({ ...data, [name]: value })
    }

    const clickSubmit = async (e) => {
        e.preventDefault()
        const { username, email, password, cpassword } = data
        try {
            const log = await fetch('/user/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, email, password, cpassword
                })
            })
            const nam = await log.json()
            window.alert(nam.status)
        } catch (err) {
            const error = await err.json()
            window.log(error.status)
        }
    }

    return (
        <>
            <div className="Login-box">
                <img src="images/logo.png" alt='logo'></img>
                <h1 className="Login-box__header">Register</h1>
                <form method='POST' onSubmit={clickSubmit}>
                    <div className="Login-box__form-content">
                        <label htmlFor="username">Full Name</label>
                        <br></br>
                        <input name="username" value={data.username} onChange={clickData}></input>
                    </div>
                    <div className="Login-box__form-content">
                        <label htmlFor="email" type="email">
                            E-mail
                        </label>
                        <br></br>
                        <input name="email" value={data.email} onChange={clickData}></input>
                    </div>
                    <div className="Login-box__form-content">
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input name="password" value={data.password} onChange={clickData}></input>
                    </div>
                    <div className="Login-box__form-content">
                        <label htmlFor="cpassword">Confirm password</label>
                        <br></br>
                        <input name="cpassword" value={data.cpassword} onChange={clickData}></input>
                    </div>

                    <button className="btn-login" type='submit'>Register</button>

                    <p className="text-login">
                        Already have account ?<Link to="login"><a href="/">Login</a> </Link>
                    </p>

                </form>
            </div>
        </>
    );
}

export default Register;
