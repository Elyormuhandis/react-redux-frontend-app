import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user.slice";
import divisionReducer from "./features/division/division.slice";
import attachmentReducer from "./features/attachment/attachment.slice";
import statisticsReducer from "./features/statistics/statistics.slice";
import uiReducer from "./features/ui/ui.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    division: divisionReducer,
    attachment: attachmentReducer,
    statistics: statisticsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["setDragFileList"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "attachment/upload/pending",
          "user/getAllByToDivision/fulfilled",
          "payload",
          "meta",
        ],
        // Ignore these paths in the state
        ignoredPaths: ["attachment.dragFileList", "meta.arg.files.0"],
      },
    }),
});

export default store;
