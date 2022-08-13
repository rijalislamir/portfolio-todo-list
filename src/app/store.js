import { configureStore } from "@reduxjs/toolkit";
import activitySlice from '../features/activity/activitySlice'
import listItemSlice from "../features/listItem/listItemSlice";

export const store = configureStore({
    reducer: {
        activity: activitySlice,
        listItem: listItemSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})