import './MainFeed.css';
import SideMenu from '../SideMenu/SideMenu';
import UploadBar from '../UserUpload/UploadBar';
import NewsApi from './NewsApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followeePost, likeDislikePost, commentPost } from '../../redux/features/post/postSlice';
import Comment from './comment-like/Comment';
import { comment } from '../../redux/features/post/postSlice';
function MainFeed(props) {
  const dispatch = useDispatch()
  const { triggered, post, cState } = useSelector((state) => state.posts)

  useEffect(() => {
    dispatch(followeePost())
  }, [triggered])
  return (
    <>
      <SideMenu />
      {cState ? <Comment /> : null}
      <div className="tile-container">
        {/* Main Feed is Starts From Here  */}
        <div className="tile-1">
          <UploadBar theme={props.theme} />

          {/* Box For main Feed  */}
          {post ? post.map(element => (
            <div className={`box`} key={element._id}>
              <div className={`box-header ${props.theme}`}>
                <figure>
                  <img src="images/sidebar/avatar.jpg" alt="avatar" />
                </figure>
                <p>{element.owner.username}</p>
                <i className="bi bi-trash-fill"></i>
              </div>
              <div className={`box-content ${props.theme}`}>
                <div className='caption'>{element.caption}</div>
                <img src="images/sidebar/avatar.jpg" alt="avatar" />
              </div>
              <div className={`box-footer ${props.theme}`}>
                <div>
                  <i className="bi bi-chat-right" onClick={() => dispatch(comment(element._id))}></i>
                  <span className='number-box'>{element.comments.length === 0 ? null : element.comments.length}</span>
                </div>
                <div>
                  <i className="bi bi-heart" onClick={() => dispatch(likeDislikePost(element._id))}></i>
                  <span className='number-box'>{element.likes.length === 0 ? null : element.likes.length}</span>
                </div>
                <i className="bi bi-send"></i>
              </div>
            </div>
          )) : null}
        </div>

        {/* Side Box For News and Api Related Work  */}
        <NewsApi theme={props.theme} />

      </div >
    </>
  );
}

export default MainFeed;
