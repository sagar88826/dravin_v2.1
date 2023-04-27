import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { myPost } from "../post/postSlice"
const initialState = {
    ft: false,
    displayNull: true
}
// 1. Authentication
// register
export const registerUser = createAsyncThunk("user/registerUser", (data) => {
    return axios.post("user/signup", data).then(response => response.data).catch(err => err.response.data.message)
})
// login
export const loginUser = createAsyncThunk("user/loginUser", (data) => {
    return axios.post("user/login", { ...data }).then(response => response.data)
        .catch(err => err.response.data.status)
})
// logout
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
    reducers: {
        resetError: (state) => {
            state.error = undefined
        }
    },
    extraReducers: builder => {
        // 1. Registering user
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            if (action.payload.owner) {
                state.isAuthenticated = true
                state.user = action.payload
                state.error = undefined
            } else {
                if (action.payload.match(/User validation failed/i))
                    state.error = "Invalid data entered"
                else if (action.payload.match(/duplicate key/i))
                    state.error = "User already exists"
            }
        })
        // 2. Logging user
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
            state.progress = 30
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.progress = 100
            if (action.payload.owner) {
                state.user = action.payload
                state.isAuthenticated = true
                state.error = undefined
            } else {
                state.error = action.payload
            }
        })
        // 3. logout user 
        builder.addCase(logoutUser.pending, (state) => {
            state.progress = 30
        })
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.progress = 100
            state.isAuthenticated = false
            state.user = ""
        })

        // 4. Getting user
        builder.addCase(getUser.pending, (state) => {
            state.progress = 30
            state.loading = true
            state.displayNull = true
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.progress = 100
            state.loading = false
            state.user = action.payload
            state.displayNull = false
            state.isAuthenticated = true
            state.error = undefined
        })
        builder.addCase(getUser.rejected, (state) => {
            state.progress = 100
            state.loading = false
            state.displayNull = false
            state.isAuthenticated = false
        })

        // 5. Updating user
        builder.addCase(updateUser.pending, (state) => {
            state.progress = 30
            state.loading = true
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.progress = 100
            state.user = action.payload
            state.loading = false
            state.error = undefined
        })
        // 6. Update password
        builder.addCase(updatePassword.pending, (state) => {
            state.progress = 30
            state.loading = true
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.progress = 100
            state.loading = false
        })
        builder.addCase(updatePassword.rejected, (state) => {
            state.progress = 100
            state.loading = false
        })
        // 7. delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.progress = 30
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state) => {
            state.progress = 100
            state.loading = false
            state.isAuthenticated = false
        })
        // 8. find user
        builder.addCase(findUser.pending, (state) => {
            state.displayNull = true
            state.progress = 30
            state.loading = true
        })
        builder.addCase(findUser.fulfilled, (state, action) => {
            state.displayNull = false
            state.progress = 100
            state.loading = false
            console.log(action.payload)
            state.foundUsers = action.payload.user
        })
        // 8. follow user
        builder.addCase(followUser.pending, (state) => {
            state.progress = 30
            state.loading = true
        })
        builder.addCase(followUser.fulfilled, (state) => {
            state.progress = 100
            state.ft ? state.ft = false : state.ft = true
        })
        // 9. my post
        builder.addCase(myPost.pending, (state) => {
            state.progress = 30
        })
        builder.addCase(myPost.fulfilled, (state) => {
            state.progress = 100
        })

    }
})

export default userSlice.reducer
export const { resetError } = userSlice.actions