import React from 'react'

function Myprofile() {
    return (
        <div className='my-profile'>
            <div className='user-detail'>
                <div>
                    <label>Name: </label>
                    <input type="text" />
                </div>
                <div>
                    <label>Email : </label>
                    <input type="text" />
                </div>
            </div>
            <div className='user-options'>
                <button>Update profile</button>
                <button>Update password</button>
                <button>Delete profile</button>
            </div>
        </div>
    )
}

export default Myprofile