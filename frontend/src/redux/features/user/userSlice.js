import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"
import axios from "axios"
const initialState = {
    loading: false,
    user: {},
    error: ""
}

export const registerUser = createAsyncThunk("user/registerUser", (data) => {
    return axios.post("user/signup", { ...data })
})

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = ""
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.user = []
            state.error = action.error.message
        })
    }
})

export default userSlice.reducer