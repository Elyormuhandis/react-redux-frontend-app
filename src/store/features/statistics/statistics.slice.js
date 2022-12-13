import { createSlice } from "@reduxjs/toolkit";
import { getAllStatistics, getAllStatisticsFromDivision, getAllStatisticsToDivision } from "./statistics.actions";

const userToken = localStorage.getItem('Token')
  ? localStorage.getItem('Token')
  : null


const initialState = {
    logs:[],
    loading: false,
    message: "",
    userToken,
    error: null,
    success: false

}

const statisticsSlice = createSlice({
    name:"statistics",
    initialState,
    reducers:{

    },
    extraReducers:{
      

// getAllStatistics for admin
[getAllStatistics.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getAllStatistics.fulfilled]: (state, { payload }) => {
  state.loading = false
  console.log(payload);
  state.logs = payload
},
[getAllStatistics.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},
// getAllStatisticsFromDivision 
[getAllStatisticsFromDivision.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getAllStatisticsFromDivision.fulfilled]: (state, { payload }) => {
  state.loading = false
  state.logs = payload
},
[getAllStatisticsFromDivision.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},
// getAllStatisticsToDivision 
[getAllStatisticsToDivision.pending]: (state) => {
  state.loading = true
  state.error = null
},
[getAllStatisticsToDivision.fulfilled]: (state, { payload }) => {
  state.loading = false
  state.logs = payload
},
[getAllStatisticsToDivision.rejected]: (state, { payload }) => {
  state.loading = false
  state.error = payload
},

}
})

export default statisticsSlice.reducer