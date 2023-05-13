import './MainFeed.css';
import SideMenu from '../SideMenu/SideMenu';
import UploadBar from '../UserUpload/UploadBar';
import NewsApi from './NewsApi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followeePost, likeDislikePost } from '../../redux/features/post/postSlice';
import Comment from './comment-like/Comment';
import { comment, like } from '../../redux/features/post/postSlice';
import Like from './comment-like/Like';
function MainFeed(props) {
  const dispatch = useDispatch()
  const { triggered, post, cState, lState } = useSelector((state) => state.posts)
  const { user } = useSelector(state => state.users)
  useEffect(() => {
    dispatch(followeePost())
  }, [triggered, dispatch])
  return (
    <>
      <SideMenu />
      {cState ? <Comment /> : null}
      {lState ? <Like /> : null}
      <div className="tile-container">
        {/* Main Feed is Starts From Here  */}
        <div className="tile-1">
          <UploadBar theme={props.theme} />

          {/* Box For main Feed  */}
          {post ? post.map(element => (
            <div className={`box`} key={element._id}>
              <div className={`box-header ${props.theme}`}>
                <figure>
                  {element.owner.avatar ? <img src={element.owner.avatar.url} alt="avatar" /> : <img src="images/sidebar/profile-image.jpg" alt="profile-image" />}
                </figure>
                <p>{element.owner.username}</p>
              </div>
              <div className='caption'>{element.caption}</div>
              <div className={`box-content ${props.theme}`}>
                {element.image ? <img src={element.image.url} alt="avatar" /> : null}
              </div>
              <div className={`box-footer ${props.theme}`}>
                <div>
                  <i className="bi bi-chat-right" onClick={() => dispatch(comment(element._id))}></i>
                  <span className='number-box'>{element.comments.length === 0 ? null : element.comments.length}</span>
                </div>
                <div>
                  {element.likes.find(el => el._id === user.owner._id)
                    ? <i className="bi bi-heart-fill" onClick={() => dispatch(likeDislikePost(element._id))}></i>
                    : <i className="bi bi-heart" onClick={() => dispatch(likeDislikePost(element._id))}></i>}
                  <span className='number-box'>{element.likes.length === 0 ? null : <span onClick={() => dispatch(like(element._id))}>{element.likes.length}</span>}</span>
                </div>
                <i className="bi bi-send"></i>
              </div>
            </div>
          )) : <p>No post yet</p>}
        </div>

        {/* Side Box For News and Api Related Work  */}
        <NewsApi />

      </div >
    </>
  );
}

export default MainFeed;
