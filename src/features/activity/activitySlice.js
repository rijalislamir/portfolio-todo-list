import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getActivities = createAsyncThunk(
    "activity/getActivities", 
    async () => {
        try {
            const response = await axios.get("https://todo.api.devcode.gethired.id/activity-groups?email=rijal%2B1%40skyshi.io")
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const getActivity = createAsyncThunk(
    "activity/getActivity", 
    async (props) => {
        try {
            const { activityId } = props
            const response = await axios.get(`https://todo.api.devcode.gethired.id/activity-groups/${activityId}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const createActivity = createAsyncThunk(
    "activity/createActivity",
    async (_, thunkAPI) => {
        try {
            const data = {
                title: 'New Activity',
                email: 'rijal+1@skyshi.io'
            }

            const response = await axios.post(`https://todo.api.devcode.gethired.id/activity-groups`, data)
            thunkAPI.dispatch(getActivities())
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const updateActivitiy = createAsyncThunk(
    'activity/updateActivitiy',
    async (props, thunkAPI) => {
        try {
            const { activityId, title } = props
            const data = { title }

            const response = await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${activityId}`, data)
            thunkAPI.dispatch(getActivity({ activityId }))
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const deleteActivity = createAsyncThunk(
    "activity/deleteActivity", 
    async (props, thunkAPI) => {
        try {
            const { activityId } = props
            const response = await axios.delete(`https://todo.api.devcode.gethired.id/activity-groups/${activityId}`)
            thunkAPI.dispatch(getActivities())
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

const initialState = {
    activities: [],
    isLoading: false,
    isError: false,
    message: '',
    all: [],
    active: null
}

export const activitySlice = createSlice({
    name: 'activity',
    initialState,
    extraReducers: builder => {
        builder
            // getActivities
            .addCase(getActivities.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getActivities.fulfilled, (state, action) => {
                state.activities = action.payload.data
                state.isLoading = false
                state.isError = false
            })
            .addCase(getActivities.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // getActivity
            .addCase(getActivity.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(getActivity.fulfilled, (state, action) => {
                state.active = action.payload
                state.isLoading = false
                state.isError = false
            })
            .addCase(getActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // createActivity
            .addCase(createActivity.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createActivity.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(createActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // updateActivitiy
            .addCase(updateActivitiy.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateActivitiy.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(updateActivitiy.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // deleteActivity
            .addCase(deleteActivity.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(deleteActivity.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(deleteActivity.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
        }
})

export default activitySlice.reducer