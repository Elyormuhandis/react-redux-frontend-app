import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.slice'
import divisionReducer from './features/division/division.slice'
import attachmentReducer from './features/attachment/attachment.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    division: divisionReducer,
    attachment:attachmentReducer
  },
})

export default store
