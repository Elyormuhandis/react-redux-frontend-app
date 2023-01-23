import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user.slice";
import divisionReducer from "./features/division/division.slice";
import attachmentReducer from "./features/attachment/attachment.slice";
import statisticsReducer from "./features/statistics/statistics.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    division: divisionReducer,
    attachment: attachmentReducer,
    statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["setDragFileList"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["user/getAllByToDivision/fulfilled.", "payload"],
        // Ignore these paths in the state
        ignoredPaths: ["attachment.dragFileList"],
      },
    }),
});

export default store;
