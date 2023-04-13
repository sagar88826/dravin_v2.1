import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteUser, logoutUser, updatePassword, updateUser } from '../../redux/features/user/userSlice'
function Myprofile() {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state)
    const [user, setUser] = useState({ username: users.user.owner.username, email: users.user.owner.email, oldPassword: "", newPassword: "" })
    const setValue = (e) => {
        const value = e.target.value
        const name = e.target.name
        setUser({ ...user, [name]: value })
    }
    const updateProfile = () => {
        const { username, email } = user
        dispatch(updateUser({ username, email }))
        alert(users.user.message)
    }
    const updateUserPassword = () => {
        const { oldPassword, newPassword } = user
        dispatch(updatePassword({ oldPassword, newPassword }))
    }
    const deleteProfile = () => {
        dispatch(deleteUser())
    }
    return (
        <div className='my-profile'>
            <div className='user-detail'>
                <div>
                    <label>Name: </label>
                    <input name='username' value={user.username} onChange={setValue}></input>
                </div>
                <div>
                    <label>Email : </label>
                    <input name='email' value={user.email} onChange={setValue} ></input>
                </div>
                <div className="user-options">
                    <button onClick={updateProfile}>Update profile</button>
                </div>
                <div>
                    <label>Old password : </label>
                    <input name='oldPassword' value={user.oldPassword} onChange={setValue} ></input>
                </div>
                <div>
                    <label>New password : </label>
                    <input name='newPassword' value={user.newPassword} onChange={setValue} ></input>
                </div>
                <div className='user-options'>
                    <button onClick={updateUserPassword}>Update password</button>
                </div>
                <div className='user-options'>
                    <button onClick={deleteProfile}>Delete profile</button>
                </div>
            </div>
        </div>
    )
}

export default Myprofile