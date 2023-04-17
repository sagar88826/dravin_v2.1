import React, { useState } from 'react';
import './UploadBar.css';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/features/post/postSlice';
export default function UploadBar(props) {
  const [data, setData] = useState({
    caption: ""
  })
  const dispatch = useDispatch()
  return (
    <>
      <div className={`mainUB ${props.theme}`}>
        <div className="UB">
          <figure className="userImg">
            <img src="images/sidebar/avatar.jpg" alt="avatar" />
          </figure>
        </div>
        <div className="col-3">
          <input
            className="effect-1"
            type="text"
            placeholder="what&#39;s happening?"
            size={50}
            value={data.caption}
            onChange={(e) => setData({
              caption: e.target.value
            })}
          />
          <span className="focus-border"></span>
        </div>
        <div className="post-area">
          <i className="bi bi-image"></i>
        </div>
        <div className="post-area">
          <button id="post-button" onClick={() => { dispatch(createPost(data)); setData({ caption: "" }) }}>Post</button>
        </div>
      </div>
    </>
  );
}
