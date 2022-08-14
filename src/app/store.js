import { configureStore } from "@reduxjs/toolkit";
import activitySlice from '../features/activity/activitySlice'
import itemListSlice from "../features/itemList/itemListSlice";

export const store = configureStore({
    reducer: {
        activity: activitySlice,
        itemList: itemListSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})