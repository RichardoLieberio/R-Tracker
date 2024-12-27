import {createSlice} from '@reduxjs/toolkit';

export const categoryPageSlice = createSlice({
    name: 'categoryPage',
    initialState: {
        order: 'desc',
        orderBy: 'created_at',
        processing: []
    },
    reducers: {
        setOrder: function(state, action) {
            state.order = action.payload;
        },
        setOrderBy: function(state, action) {
            state.orderBy = action.payload;
        },
        addProcess: function(state, action) {
            state.processing = [...state.processing, action.payload];
        },
        deleteProcess: function(state, action) {
            state.processing = state.processing.filter(id => id !== action.payload);
        }
    }
});

export const {setOrder, setOrderBy, addProcess, deleteProcess} = categoryPageSlice.actions;

export default categoryPageSlice.reducer;