import { createSlice } from "@reduxjs/toolkit";
import { uploadFiles } from "./attachment.actions";

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null


const initialState = {
    files:[],
    loading: false,
    message: "",
    userToken,
    error: null,
    success: false

}

const attachmentSlice = createSlice({
    name:"attechment",
    initialState,
    reducers:{

    },
    extraReducers:{
      
// upload files
[uploadFiles.pending]: (state) => {
  state.loading = true
  state.error = null
},
[uploadFiles.fulfilled]: (state, { payload }) => {
  state.loading = false
  state.success = payload.success
  state.message = payload.message
},

[uploadFiles.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},
    }
})

export default attachmentSlice.reducer