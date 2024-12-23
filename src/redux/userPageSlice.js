import {createSlice} from '@reduxjs/toolkit';

export const userPageSlice = createSlice({
    name: 'userPage',
    initialState: {
        order: 'desc',
        orderBy: 'created_at',
        page: 1,
        rowsPerPage: 5,
        rowsOption: [5, 10, 25]
    },
    reducers: {
        setOrder: function(state, action) {
            state.order = action.payload;
        },
        setOrderBy: function(state, action) {
            state.orderBy = action.payload;
        },
        setPage: function(state, action) {
            state.page = action.payload < 1 ? 1 : action.payload;
        },
        setRowsPerPage: function(state, action) {
            state.rowsPerPage = state.rowsOption.includes(action.payload) ? action.payload : 5;
        }
    }
});

export const {setOrder, setOrderBy, setPage, setRowsPerPage} = userPageSlice.actions;

export default userPageSlice.reducer;