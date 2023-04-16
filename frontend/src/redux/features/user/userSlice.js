import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
    ft: false
}
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
// 3. update profile
export const updateUser = createAsyncThunk("user/updateUser", (data) => {
    return axios.patch("user/my-profile", { ...data }).then(response => response.data)
})
// 4. update password
export const updatePassword = createAsyncThunk("user/updatePassword", (data) => {
    return axios.patch("user/update-password", { ...data }).then(response => response.data)
})
// 5. delete user
export const deleteUser = createAsyncThunk("user/deleteUser", (data) => {
    return axios.delete("user/delete-profile", { ...data }).then(response => response.data)
})
// 6. find user
export const findUser = createAsyncThunk("user/findUser", (data) => {
    return axios.post("user/find-user", { name: data }).then(response => response.data)
})
// 7. follow user
export const followUser = createAsyncThunk("user/followUser", (data) => {
    return axios.post("user/follow/", { ...data }).then(response => response.data)
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
            state.user = action.payload
            state.error = ""
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
            state.error = ""
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.user = []
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
            state.isAuthenticated = true
            state.error = ""
        })
        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false
            state.isAuthenticated = false
            state.error = action.error
            console.log(action.payload)
        })

        // 5. Updating user
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            console.log(action)
            state.user = action.payload
            state.loading = false
            state.error = ""
        })
        // 6. Update password
        builder.addCase(updatePassword.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload)
        })
        builder.addCase(updatePassword.rejected, (state) => {
            state.loading = false
        })
        // 7. delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.loading = false
            state.isAuthenticated = false
        })
        // 8. find user
        builder.addCase(findUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(findUser.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload)
            state.foundUsers = action.payload.user
        })
        // 8. follow user
        // builder.addCase(followUser.pending, (state) => {
        //     state.loading = true
        // })
        builder.addCase(followUser.fulfilled, (state) => {
            state.ft ? state.ft = false : state.ft = true
        })


    }
})

export default userSlice.reducer