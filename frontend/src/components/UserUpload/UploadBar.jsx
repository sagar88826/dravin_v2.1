import React, { useState } from 'react';
import './UploadBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../redux/features/post/postSlice';
export default function UploadBar(props) {
  // form object
  let postObj = new FormData()
  // useState
  const [data, setData] = useState({
    caption: ""
  })
  // redux
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.users)
  // function
  const submitPost = (e) => {
    console.log(data)
    postObj.append("caption", data.caption)
    for (const pair of postObj.entries()) {
      console.log(`${pair[0]} ${pair[1]} `)
    }
    dispatch(createPost(postObj))
    setData({ caption: "" })
  }
  return (
    <>
      <div className={`mainUB ${props.theme}`}>
        <div className="UB">
          <figure className="userImg">
            {user.owner.avatar ? <img src={user.owner.avatar.url} alt="s" /> : <img src="images/sidebar/profile-image.jpg" alt="profile-image" />}
          </figure>
        </div>
        <div className="col-3">
          <input
            className="effect-1"
            type="text"
            placeholder="what&#39;s happening?"
            size={50}
            value={data.caption}
            onChange={(e) => setData({ caption: e.target.value })}
          />
          <span className="focus-border"></span>
        </div>
        <div className="post-area">
          <label htmlFor="file-input">
            <i className="bi bi-image"></i>
          </label>
          <input type="file" id='file-input' onChange={(e) => postObj.append("postImage", e.target.files[0])} />
        </div>
        <div className="post-area">
          <button id="post-button" onClick={submitPost}>Post</button>
        </div>
      </div>
    </>
  );
}
