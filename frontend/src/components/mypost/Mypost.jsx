import './MainFeed.css';
import SideMenu from '../SideMenu/SideMenu';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeDislikePost } from '../../redux/features/post/postSlice';
import { comment, like, myPost, deletePost } from '../../redux/features/post/postSlice';
import Comment from './comment-like/Comment';
import Like from './comment-like/Like';

const Mypost = () => {
    const dispatch = useDispatch()
    const { triggered, post, cState, lState, myPosts } = useSelector((state) => state.posts)
    const { user } = useSelector(state => state.users)
    useEffect(() => {
        dispatch(myPost())
    }, [triggered, dispatch])
    return (
        <>
            <SideMenu />
            {cState ? <Comment /> : null}
            {lState ? <Like /> : null}
            <div className="tile-container">
                {/* Main Feed is Starts From Here  */}
                <div className="tile-1">
                    {/* <UploadBar /> */}

                    {/* Box For main Feed  */}
                    {myPosts ? myPosts.map(element => (
                        <div className={`box`} key={element._id}>
                            <div className={`box-header`}>
                                <figure>
                                    <img src="images/sidebar/avatar.jpg" alt="avatar" />
                                </figure>
                                <p>{element.owner.username}</p>
                                <i className="bi bi-trash-fill" onClick={() => dispatch(deletePost(element._id))}></i>
                            </div>
                            <div className={`box-content`}>
                                <div className='caption'>{element.caption}</div>
                                <img src="images/sidebar/avatar.jpg" alt="avatar" />
                            </div>
                            <div className={`box-footer`}>
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
                    )) : null}
                </div>

                {/* Side Box For News and Api Related Work  */}

            </div >
        </>
    )
}

export default Mypost