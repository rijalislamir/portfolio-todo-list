import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all: [],
    active: null
}

export const itemListSlice = createSlice({
    name: 'itemList',
    initialState,
    reducers: {
        addItemList: (state, action) => {
            state.all = [{ id: +new Date, name: action.payload.name, priority: action.payload.priority, priorityIndicator: action.payload.priorityIndicator, activityId: action.payload.activityId, date: new Date(), done: false }, ...state.all]
        },
        deleteItemList: (state, action) => {
            state.all = state.all.filter((_, i) => i !== action.payload.index)
        },
        toggleItemListDone: (state, action) => {
            state.all = state.all.map((item, i) => (item.id === action.payload.id) ? {...item, done: !item.done} : item)
        }
    }
})

export const { addItemList, deleteItemList, toggleItemListDone } = itemListSlice.actions

export default itemListSlice.reducer