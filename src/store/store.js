import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.slice'
import divisionReducer from './features/division/division.slice'
import attachmentReducer from './features/attachment/attachment.slice'
import statisticsReducer from './features/statistics/statistics.slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    division: divisionReducer,
    attachment:attachmentReducer,
    statistics: statisticsReducer,
  },
})

export default store
