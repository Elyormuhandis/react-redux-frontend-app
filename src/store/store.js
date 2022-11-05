import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.slice'
import divisionReducer from './features/division/division.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    division: divisionReducer
  },
})

export default store
