import { createSlice } from '@reduxjs/toolkit'
import { addDivision, deleteDivision, editDivision, getDivisions } from './division.action'


// initialize userToken from local storage
const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null

const initialState = {
    divisions:[],
    loading: false,
    message: "",
    userToken,
    error: null,
    success: false

}

const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers:{},
    extraReducers:{
    //get Division
    [getDivisions.pending]: (state) => {
      state.loading = true
    },
    [getDivisions.fulfilled]: (state, {payload}) => {
        state.loading = false
        state.divisions = payload 
      },    
    [getDivisions.rejected]: (state, {payload}) => {
        state.loading = false
        state.error = payload
      },
      
    //add Division
    [addDivision.pending]: (state) => {
        state.loading = true
      },
    [addDivision.fulfilled]: (state, {payload}) => {
        state.loading = false
        state.message = payload.message
        state.success = payload.success
        state.divisions = payload.object
      },    
    [addDivision.rejected]: (state, {payload}) => {
        state.loading = false
        state.error = payload
      },
      
      //edit Division
      [editDivision.pending]: (state) => {
          state.loading = true
        },
      [editDivision.fulfilled]: (state, {payload}) => {
          state.loading = false
          state.message = payload.message
          state.success = payload.success
          state.divisions = payload.object
        },    
        [editDivision.rejected]: (state, {payload}) => {
          state.loading = false
          state.error = payload
        },
        
        //delete Division
        [deleteDivision.pending]: (state) => {
          state.loading = true
        },
        [deleteDivision.fulfilled]: (state, {payload}) => {
          state.loading = false
          state.message = payload.message
          state.success = payload.success
          state.divisions = payload.object
        },    
      [deleteDivision.rejected]: (state, {payload}) => {
          state.loading = false
          state.error = payload
        },
      
    }

})

export default divisionSlice.reducer