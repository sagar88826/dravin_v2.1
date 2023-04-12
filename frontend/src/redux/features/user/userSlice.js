import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {}
// 1. Authentication
export const registerUser = createAsyncThunk("user/registerUser", (data) => {
    return axios.post("user/signup", { ...data }).then(response => response.data)
})

export const loginUser = createAsyncThunk("user/loginUser", (data) => {
    return axios.post("user/login", { ...data }).then(response => response.data)
})

export const logoutUser = createAsyncThunk("user/logoutUser", () => {
    return axios.get("user/logout")
})

// 2. User

export const getUser = createAsyncThunk("user/getUser", () => {
    return axios.get("user/my-profile").then(response => response.data)
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        // 1. Registering user
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = true
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.isAuthenticated = false
        })
        // 2. Logging user
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.isAuthenticated = false
        })
        // 3. logout user 
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false
        })

        // 4. Getting user
        builder.addCase(getUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            console.log("triggerereeeeeeee")
            state.isAuthenticated = true
            console.log(state.isAuthenticated)
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
            state.isAuthenticated = false
        })


    }
})

export default userSlice.reducer