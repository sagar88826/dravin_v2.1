import React, { useState } from 'react'
import "../MainFeed.css"
import { useDispatch, useSelector } from 'react-redux'
import { comment, commentPost, myPost } from '../../../redux/features/post/postSlice'
const Comment = () => {
    const dispatch = useDispatch()
    const { postId } = useSelector(state => state.posts)
    const post = useSelector(state => state.posts.myPosts.find(el => el._id === postId))
    const [data, setData] = useState({
        postId: postId,
        commentBody: ""
    })

    return (
        <>


            <div className='comment-box' >
                <div className='cross'>
                    <h2>Comments</h2>
                    <i className="bi bi-x-lg" onClick={() => dispatch(comment())}></i>
                </div>
                <div className='comment-field'>
                    <img src="images/sidebar/avatar.jpg" alt="avatar" />
                    <input type="text" value={data.commentBody} onChange={(e) => setData({ ...data, commentBody: e.target.value })} />
                    <button onClick={() => { dispatch(commentPost(data)); setData({ ...data, commentBody: "" }) }} >comment</button>
                </div>
                {
                    post ? post.comments.map(element => (
                        <div className='comments' key={element._id}>
                            <figure className='comment-image'>
                                <img src="images/sidebar/avatar.jpg" alt="avatar" />
                                <div className='user'>{element.user.username}</div>
                            </figure>
                            <div className='comment-body'>{element.comment}</div>
                        </div>
                    )) : null
                }
            </div >



        </>
    )
}

export default Comment