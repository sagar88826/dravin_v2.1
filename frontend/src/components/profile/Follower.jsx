import React from 'react'
import { useSelector } from 'react-redux'
const Follower = () => {
    const { followers } = useSelector((state) => state.users.user.owner)
    return (
        <div>
            {
                followers.map(user => (
                    <div className="user-name" key={user.id}>
                        <div className="dp">
                            <img src="images/sidebar/avatar.jpg" alt="" />
                        </div>
                        <div className="content">
                            <p className="Name">{user.username}</p>
                            <p className="R-msg">Rescent Message</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Follower