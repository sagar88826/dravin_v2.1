import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import axios from "axios"
const initialState = {

}

export const registerUser = createAsyncThunk("user/registerUser", (data) => {
    return axios.post("user/signup", { ...data })
})

export const loginUser = createAsyncThunk("user/loginUser", (data) => {
    console.log(data)
    return axios.post("user/login", { ...data })
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
            state.user = action.payload.data.data.user
            state.error = ""
            state.isAuthenticated = true
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error.message
            state.isAuthenticated = false
        })
        // 2. Logging user
        builder.addCase(loginUser.pending, (state) => {
            console.log("pending")
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loading = false
            state.user = action.payload.data.user
            state.error = ""
            state.isAuthenticated = true
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error.message
            state.isAuthenticated = false
        })

    }
})

export default userSlice.reducer