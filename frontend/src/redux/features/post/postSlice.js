import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    triggered: false,
    cState: false,
    lState: false,
    postId: ""
}

// 1.creating post
export const createPost = createAsyncThunk("post/createPost", (captionData) => {
    for (const pair of captionData.entries()) {
        console.log(`${pair[0]} ${pair[1]}`)
    }
    return axios.post("user/post/upload", captionData).then(response => response.data)
})
// 2.deleting post
export const deletePost = createAsyncThunk("post/deletePost", (postId) => {
    return axios.delete(`user/post/${postId}`).then(response => response.data)
})
// 3.like-dislike post
export const likeDislikePost = createAsyncThunk("post/likeDislikePost", (postId) => {
    return axios.get(`user/post/likes/${postId}`).then(response => response.data)
})
// 4.commenting post
export const commentPost = createAsyncThunk("post/commentPost", (data) => {
    return axios.post(`user/post/comment/${data.postId}`, { "comment": data.commentBody }).then(response => response.data)
})
// 5.followee posts
export const followeePost = createAsyncThunk("post/followeePost", () => {
    return axios.get("user/post/followee-post").then(response => response.data)
})
// 5.my posts
export const myPost = createAsyncThunk("post/myPost", () => {
    return axios.get("user/post/my-post").then(response => response.data)
})

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        comment: (state, action) => {
            state.cState ? state.cState = false : state.cState = true
            state.postId = action.payload
        },
        like: (state, action) => {
            state.lState ? state.lState = false : state.lState = true
            state.postId = action.payload
        }
    },
    extraReducers: builder => {
        // 1. create post
        builder.addCase(createPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createPost.fulfilled, (state) => {
            state.loading = false
            state.triggered ? state.triggered = false : state.triggered = true
        })
        builder.addCase(createPost.rejected, (state, action) => {
            console.log(action.error)
        })

        // 2. delete post
        builder.addCase(deletePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deletePost.fulfilled, (state) => {
            state.loading = false
            state.triggered ? state.triggered = false : state.triggered = true
        })
        // 3. like-dislike post
        builder.addCase(likeDislikePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(likeDislikePost.fulfilled, (state) => {
            state.loading = false
            state.triggered ? state.triggered = false : state.triggered = true
        })
        // 4. comment post
        builder.addCase(commentPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(commentPost.fulfilled, (state) => {
            state.loading = false
            state.triggered ? state.triggered = false : state.triggered = true
        })
        // 5. followee post
        builder.addCase(followeePost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(followeePost.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post.reverse()
        })
        // 5. my post
        builder.addCase(myPost.pending, (state) => {
            state.loading = true
        })
        builder.addCase(myPost.fulfilled, (state, action) => {
            state.loading = false
            state.myPosts = action.payload.post.reverse()
            // console.log(state.myPost)
        })
    }
})

export default postSlice.reducer
export const { comment, like } = postSlice.actions