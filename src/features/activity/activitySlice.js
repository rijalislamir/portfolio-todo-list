import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all: [],
    active: null
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        addActivity: (state) => {
            state.all = [{ id: +new Date, name: 'New Activity', date: new Date() }, ...state.all]
        },
        deleteActivity: (state, action) => {
            state.all = state.all.filter((_, i) => i !== action.payload.index)
        },
        selectActivity: (state, action) => {
            state.active = action.payload
        },
        updateActivity: (state, action) => {
            state.active = {...state.active, name: action.payload.name}
            state.all = state.all.map(activity => {
                if (activity.id === action.payload.id) {
                    return {
                        id: activity.id,
                        name: action.payload.name,
                        date: activity.date
                    }
                } else {
                    return activity
                }
            })
        }
    }
})

export const { addActivity, deleteActivity, selectActivity, updateActivity } = activitySlice.actions

export default activitySlice.reducer