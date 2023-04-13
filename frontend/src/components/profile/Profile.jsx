import React, { useState } from 'react';
import './my-profile.css';
import SideMenu from '../SideMenu/SideMenu';
import Myprofile from './Myprofile';
import Follower from './Follower';

export default function Profile() {
    const [option, setOption] = useState(false)
    const highlight = "highlight"
    const changeOption = (event) => {
        event.target.innerHTML === "My profile" ? setOption(false) : setOption(true)
    }

    return (
        <>
            <SideMenu />
            <div className="container-msg">
                <div className="user-tab">
                    <div className="user-header">
                        <p onClick={changeOption} className={!option ? highlight : null}>My profile</p>
                        <p onClick={changeOption} className={option ? highlight : null}>Followers</p>
                        <i className="bi bi-person-fill"></i>
                    </div>
                    {!option ? <Myprofile /> : <Follower />}
                </div>
            </div>
        </>
    );
}
