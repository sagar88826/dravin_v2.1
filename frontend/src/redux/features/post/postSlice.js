import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    triggered: false,
    cState: false,
    postId: ""
}

// 1.creating post
export const createPost = createAsyncThunk("post/createPost", (captionData) => {
    return axios.post("user/post/upload", { ...captionData }).then(response => response.data)
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

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        comment: (state, action) => {
            state.cState ? state.cState = false : state.cState = true
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
            // console.log(action.payload)

        })
    }
})

export default postSlice.reducer
export const { comment } = postSlice.actions