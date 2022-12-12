import { createSlice } from "@reduxjs/toolkit";
import { downloadFileFromFileSystem, getAllByFromDivision, getAllByToDivision, getAllStatistics, getOneReceivedFile, getOneSentFile, setPDTV, setView, uploadFiles } from "./attachment.actions";

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null


const initialState = {
    files:[],
    loading: false,
    message: "",
    yuborilganFayllar:[],
    oneReceivedFile:{},
    oneSentFile:{},
    kelganFayllar:[],
    downloadFileFromFileSystem: undefined,
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
  state.kelganFayllar = payload.object
},

[setView.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},

// setPDTV
[setPDTV.pending]: (state) => {
  state.loading = true
  state.error = null
},
[setPDTV.fulfilled]: (state, { payload }) => {
  state.loading = false
  state.message = payload.message
  state.success = payload.success
  state.kelganFayllar = payload.object
},

[setPDTV.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},

// getOneReceivedFile
[getOneReceivedFile.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getOneReceivedFile.fulfilled]: (state, { payload }) => {
  state.loading = false
  state.oneReceivedFile = payload
},

[getOneReceivedFile.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},


// getOneSentFile
[getOneSentFile.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getOneSentFile.fulfilled]: (state, { payload }) => {
  state.loading = false
  console.log(payload);
  state.oneSentFile = payload
},

[getOneSentFile.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},


// downloadFileFromFileSystem
[downloadFileFromFileSystem.pending]: (state) => {
  state.loading = true
  state.error = null
},
[downloadFileFromFileSystem.fulfilled]: (state, { payload }) => {
  state.loading = false
  console.log(payload);
  // state.downloadFileFromFileSystem = payload
},

[downloadFileFromFileSystem.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},
// downloadFileFromFileSystem
[getAllStatistics.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getAllStatistics.fulfilled]: (state, { payload }) => {
  state.loading = false
  console.log(payload);
  // state.getAllStatistics = payload
},

[getAllStatistics.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},

}
})

export default attachmentSlice.reducer