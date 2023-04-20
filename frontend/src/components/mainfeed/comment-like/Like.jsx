import React from 'react'
import { like } from "../../../redux/features/post/postSlice"
import "../MainFeed.css"
import { useDispatch, useSelector } from 'react-redux'
const Like = () => {
    const { post, postId } = useSelector(state => state.posts)
    const Post = post.find(el => el._id === postId)
    const likes = Post.likes
    const dispatch = useDispatch()
    return (
        <>
            <div className='comment-box' >
                <div className='cross'>
                    <h2>Liked By..</h2>
                    <i className="bi bi-x-lg" onClick={() => dispatch(like())}></i>
                </div>
                {
                    likes.map(element => (
                        <div className='comments' key={element._id}>
                            <figure className='comment-image'>
                                <img src="images/sidebar/avatar.jpg" alt="avatar" />
                                <div className='user'>{element.username}</div>
                            </figure>
                        </div>
                    ))
                }
            </div >
        </>
    )
}

export default Like