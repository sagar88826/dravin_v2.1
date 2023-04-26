import React, { useState, useEffect } from 'react';
import './search.css';
import SideMenu from '../SideMenu/SideMenu';
import { useDispatch, useSelector } from 'react-redux';
import { findUser, getUser } from '../../redux/features/user/userSlice';
import { followUser } from '../../redux/features/user/userSlice';
export default function Search() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.foundUsers)
    const { following, _id } = useSelector((state) => state.users.user.owner)
    const { ft } = useSelector((state) => state.users)
    const [name, setName] = useState("")
    const changeName = (e) => {
        setName(e.target.value)
    }
    const submitValue = () => {
        dispatch(findUser(name))
    }
    useEffect(() => {
        dispatch(getUser())
    }, [ft, dispatch])
    return (
        <>
            <SideMenu />
            <div className="container-msg">
                <div className="user-tab">
                    <div className="user-header">
                        <h2>Search people</h2>
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <div className="search-bar">
                        <input className="search-bar-component" placeholder="Search" value={name} onChange={changeName} />
                        <i className="bi bi-search" onClick={submitValue}></i>
                    </div>
                    {user ? user.map(user => (user._id !== _id ?
                        <div className="user-name" key={user._id}>
                            <div className="dp">
                                {user.avatar ? <img src={user.avatar.url} alt="avatar" /> : null}
                            </div>
                            <div className="content">
                                <p className="Name">{user.username}</p>
                                <p className="R-msg">Rescent Message</p>
                            </div>
                            <button className='follow' value={user._id} onClick={() => { dispatch(followUser({ "id": user._id, "username": user.username })) }}>
                                {following.find(element => element.id === user._id) ? "Unfollow" : "Follow"}
                            </button>
                        </div> : null
                    )) : null}
                </div>

            </div>
        </>
    );
}
