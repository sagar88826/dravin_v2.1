import React, { useState } from 'react';
import '../login/Login.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from '../../redux/features/user/userSlice';
function Register() {
    const dispatch = useDispatch()
    const { loading, user, error } = useSelector((state) => state.users)
    const [data, setData] = useState({
        username: "", email: "", password: "", cpassword: ""
    })
    const changeValue = (e) => {
        const value = e.target.value
        const name = e.target.name
        setData({ ...data, [name]: value })
    }

    const submit = async (e) => {
        e.preventDefault()
        dispatch(registerUser(data))
    }

    return (
        <>
            <div className="Login-box">
                <img src="images/logo.png" alt='logo'></img>
                <h1 className="Login-box__header">Register</h1>
                <form method='POST' onSubmit={submit}>
                    <div className="Login-box__form-content">
                        <label htmlFor="username">Full Name</label>
                        <br></br>
                        <input name="username" value={data.username} onChange={changeValue}></input>
                    </div>
                    <div className="Login-box__form-content">
                        <label htmlFor="email" type="email">
                            E-mail
                        </label>
                        <br></br>
                        <input name="email" value={data.email} onChange={changeValue}></input>
                    </div>
                    <div className="Login-box__form-content">
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input name="password" value={data.password} onChange={changeValue}></input>
                    </div>
                    <div className="Login-box__form-content">
                        <label htmlFor="cpassword">Confirm password</label>
                        <br></br>
                        <input name="cpassword" value={data.cpassword} onChange={changeValue}></input>
                    </div>

                    <button className="btn-login" type='submit'>Register</button>
                    {loading ? <p>Loading...</p> : null}
                    {!loading && error ? <p style={{ color: "red" }}>Invalid user details....</p> : null}
                    <p className="text-login">Already have account ?<Link to="/">Login</Link></p>

                </form>
            </div>
        </>
    );
}

export default Register;
