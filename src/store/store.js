import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import divisionReducer from './features/division/division.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    division: divisionReducer
  },
})

export default store
