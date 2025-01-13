import {createSlice} from '@reduxjs/toolkit';

export const chartPageSlice = createSlice({
    name: 'chartPage',
    initialState: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        expense: null
    },
    reducers: {
        prevMonth: function(state) {
            if (state.month === 0) {
                if (state.year !== +process.env.START_YEAR) {
                    state.year -= 1;
                    state.month = 11;
                }
            } else {
                state.month -= 1;
            }
        },
        nextMonth: function(state) {
            const curYear = new Date().getFullYear();

            if (state.month === 11) {
                if (state.year !== curYear) {
                    state.year += 1;
                    state.month = 0;
                }
            } else {
                state.month += 1;
            }
        },
        setMonth: function(state, action) {
            state.month = action.payload;
        },
        setYear: function(state, action) {
            state.year = action.payload;
        },
        setExpense: function(state, action) {
            state.expense = action.payload;
        },
        logout: function(state) {
            state.year = new Date().getFullYear();
            state.month = new Date().getMonth();
            state.expense = null;
        }
    }
});

export const {prevMonth, nextMonth, setMonth, setYear, setExpense, logout} = chartPageSlice.actions;

export default chartPageSlice.reducer;