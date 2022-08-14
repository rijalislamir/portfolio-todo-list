import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getActivity } from "../activity/activitySlice";

export const createItemList = createAsyncThunk(
    'itemList/createItemList',
    async (props, thunkAPI) => {
        try {
            const { activity_group_id } = props
            const response = await axios.post(`https://todo.api.devcode.gethired.id/todo-items`, props)
            thunkAPI.dispatch(getActivity({ activityId: activity_group_id }))
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const updateItemList = createAsyncThunk(
    'itemList/updateItemList',
    async (props, thunkAPI) => {
        try {
            const { itemListId, activityId } = props
            console.log(itemListId, activityId, props)
            const response = await axios.patch(`https://todo.api.devcode.gethired.id/todo-items/${itemListId}`, props)
            thunkAPI.dispatch(getActivity({ activityId }))
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

export const deleteItemList = createAsyncThunk(
    'itemList/deleteItemList',
    async (props, thunkAPI) => {
        try {
            const { itemListId, activity_group_id } = props
            const response = await axios.delete(`https://todo.api.devcode.gethired.id/todo-items/${itemListId}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    }
)

const initialState = {
    message: '',
    isLoading: false,
    isError: false,
    all: [],
    active: null
}

export const itemListSlice = createSlice({
    name: 'itemList',
    initialState,
    extraReducers: builder =>
        builder
            // createItemList
            .addCase(createItemList.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(createItemList.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(createItemList.rejected, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.message = action.payload
            })
            // updateItemList
            .addCase(updateItemList.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateItemList.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(updateItemList.rejected, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.message = action.payload
            })
            // deleteItemList
            .addCase(deleteItemList.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(deleteItemList.fulfilled, (state) => {
                state.isLoading = false
                state.isError = false
            })
            .addCase(deleteItemList.rejected, (state, action) => {
                state.isLoading = true
                state.isError = false
                state.message = action.payload
            })
    // reducers: {
    //     addItemList: (state, action) => {
    //         state.all = [{
    //             id: +new Date,
    //             name: action.payload.name,
    //             priority: action.payload.priority,
    //             priorityIndicator: action.payload.priorityIndicator,
    //             activityId: action.payload.activityId,
    //             date: new Date(),
    //             done: false
    //         }, ...state.all]
    //     },
    //     updateItemList: (state, action) => {
    //         state.all = state.all.map(item => 
    //             (item.id === action.payload.id) 
    //                 ? {
    //                     ...item,
    //                     name: action.payload.name,
    //                     priority: action.payload.priority,
    //                     priorityIndicator: action.payload.priorityIndicator
    //                 } 
    //                 : item
    //         )
    //     },
    //     deleteItemList: (state, action) => {
    //         state.all = state.all.filter(item => item.id !== action.payload.id)
    //     },
    //     toggleItemListDone: (state, action) => {
    //         state.all = state.all.map(item => (item.id === action.payload.id) ? {...item, done: !item.done} : item)
    //     }
    // }
})

// export const { addItemList, updateItemList, deleteItemList, toggleItemListDone } = itemListSlice.actions

export default itemListSlice.reducer