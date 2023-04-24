import React, { useState } from 'react';
import '../login/Login.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from '../../redux/features/user/userSlice';
function Register() {
    // 1. redux toolkit
    const dispatch = useDispatch()
    const { loading, user, error } = useSelector((state) => state.users)
    // 2. useStates
    const [data, setData] = useState({
        username: "", email: "", password: "", cpassword: ""
    })
    const [image, setImage] = useState()
    // 3. functions
    const changeValue = (e) => {
        const value = e.target.value
        const name = e.target.name
        setData({ ...data, [name]: value })
    }
    const changeImage = (e) => {
        setImage(e.target.files[0])
    }

    const submit = async (e) => {
        const formData = new FormData()
        formData.append("username", data.username)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("cpassword", data.cpassword)
        formData.append("image", image)
        for (const pair of formData.entries()) {
            console.log(`${pair[0]} ${pair[1]}`)
        }
        dispatch(registerUser(formData))
        e.preventDefault()
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
                    <div className="Login-box__form-content" id='last_form-content'>
                        <label htmlFor="profile-image">Upload profile image</label>
                        <br></br><br />
                        <input name="profile-image" type='file' onChange={changeImage}></input>
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
