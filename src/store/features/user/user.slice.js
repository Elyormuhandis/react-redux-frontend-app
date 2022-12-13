import { createSlice } from '@reduxjs/toolkit'
import { getUser, addUser, userLogin, getUsers, editUser, getRoles, getRole, deleteUser } from './user.actions'

// initialize userToken from local storage
const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null
const userRole = localStorage.getItem('role')
  ? localStorage.getItem('role')
  : null
const userDivision = localStorage.getItem('divisionId')
  ? localStorage.getItem('divisionId')
  : null


const initialState = {
  loading: false,
  users:[],
  roles:[],
  role:[],
  userDivision,
  userRole,
  userToken,
  error: null,
  success: false,
  message:''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('Token') // delete token from storage
      localStorage.removeItem('role') // delete role from storage
      localStorage.removeItem('divisionId') // delete divisionId from storage
      state.loading = false
      state.users = []
      state.roles = []
      state.userRole = null
      state.userToken = null
      state.userDivision = null
      state.error = null
      state.message = ''
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      localStorage.setItem(`${payload.message}`, payload.token)
      localStorage.setItem("role", payload.object.name)
      localStorage.setItem("divisionId", payload.object2?.id)
      state.userDivision = payload.object2?.id
      state.userToken = payload.token
      state.userRole = payload.object.name
      state.loading = false
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // add User
    [addUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [addUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload.object
      state.success = payload.success
      state.message = payload.message
    },
    [addUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // get User by id
    [getUser.pending]: (state) => {
      state.loading = true
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // get Users by page
    [getUsers.pending]: (state) => {
      state.loading = true
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload.content
    },
    [getUsers.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // edit User 
    [editUser.pending]: (state) => {
      state.loading = true
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload.object
      state.success = payload.success
      state.message = payload.message
    },
    [editUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // delete User1171819+ 
    [deleteUser.pending]: (state) => {
      state.loading = true
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload.object
      state.success = payload.success
      state.message = payload.message
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },

    // get Roles  
    [getRoles.pending]: (state) => {
      state.loading = true
    },
    [getRoles.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.roles = payload
    },
    [getRoles.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    
    // get Role  
    [getRole.pending]: (state) => {
      state.loading = true
    },
    [getRole.fulfilled]: (state, { payload }) => {
      localStorage.setItem("role", payload.name)
      state.loading = false
      state.userRole = payload.name
    },
    [getRole.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
