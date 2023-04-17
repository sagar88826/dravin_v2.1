import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice"
import postReducer from "../features/post/postSlice"
const store = configureStore({
    reducer: {
        "users": userReducer,
        "posts": postReducer
    }
})

export default store