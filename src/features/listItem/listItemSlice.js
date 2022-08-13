import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all: [],
    active: null
}

export const listItemSlice = createSlice({
    name: 'listItem',
    initialState,
    reducers: {
        addListItem: (state) => {
            state.all = [{ id: +new Date, name: 'New List Item', activityId: null, date: new Date() }, ...state.all]
        },
        deleteListItem: (state, action) => {
            state.all = state.all.filter((_, i) => i !== action.payload.index)
        }
    }
})

export const { addListItem, deleteListItem } = listItemSlice.actions

export default listItemSlice.reducer