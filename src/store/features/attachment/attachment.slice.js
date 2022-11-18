import { createSlice } from "@reduxjs/toolkit";
import { getAllByFromDivision, uploadFiles } from "./attachment.actions";

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null


const initialState = {
    files:[],
    loading: false,
    message: "",
    yuborilganFayllar:[],
    userToken,
    error: null,
    success: false

}

const attachmentSlice = createSlice({
    name:"attachment",
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
    
      
// getAllByFromDivision
[getAllByFromDivision.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getAllByFromDivision.fulfilled]: (state, { payload }) => {
  console.log(payload)
  state.loading = false
  state.yuborilganFayllar = [...payload]
},

[getAllByFromDivision.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},
    }
})

export default attachmentSlice.reducer