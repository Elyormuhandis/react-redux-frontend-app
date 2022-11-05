import { createSlice } from '@reduxjs/toolkit'
import { getUser, addUser, userLogin } from './user.actions'

// initialize userToken from local storage
const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('Token') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.object
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [addUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [addUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [addUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // get user details
    [getUser.pending]: (state) => {
      state.loading = true
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
