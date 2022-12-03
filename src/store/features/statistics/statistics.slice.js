import { createSlice } from "@reduxjs/toolkit";
import { getAllByCreatedAtBetween } from "./statistics.actions";




const initialState = {
    loading: false,
    message: "",
    error: null,
    success: false

}

const statisticsSlice = createSlice({
    name:"statistics",
    initialState,
    reducers:{

    },
    extraReducers:{
      
  // getAllByCreatedAtBetween 
  [getAllByCreatedAtBetween.pending]: (state) => {
    state.loading = true
    state.error = null
  },
  [getAllByCreatedAtBetween.fulfilled]: (state, { payload }) => {
    state.loading = false
    state.success = payload.success
    state.message = payload.message
  },

  [getAllByCreatedAtBetween.rejected]: (state, { payload }) => {
    state.loading = false
    state.error = payload
  },
      
}
})

export default statisticsSlice.reducer