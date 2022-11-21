import { createSlice } from "@reduxjs/toolkit";
import { getAllByFromDivision, getAllByToDivision, setView, uploadFiles } from "./attachment.actions";

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null


const initialState = {
    files:[],
    loading: false,
    message: "",
    yuborilganFayllar:[],
    kelganFayllar:[],
    korildi:false,
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
  state.loading = false
  state.yuborilganFayllar = [...payload]
},

[getAllByFromDivision.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},

// getAllByToDivision
[getAllByToDivision.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getAllByToDivision.fulfilled]: (state, { payload }) => {
  console.log(payload)
  state.loading = false
  state.kelganFayllar = [...payload]
},

[getAllByToDivision.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},
// setView
[setView.pending]: (state) => {
  state.loading = true
  state.error = null
},
[setView.fulfilled]: (state, { payload }) => {
  state.loading = false
  state.message = payload.message
  state.success = payload.success
},

[setView.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},

}
})

export default attachmentSlice.reducer