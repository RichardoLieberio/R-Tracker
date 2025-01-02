import {createSlice} from '@reduxjs/toolkit';

export const expensePageSlice = createSlice({
    name: 'expensePage',
    initialState: {
        year: new Date().getFullYear(),
        month: new Date().getMonth()
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
        }
    }
});

export const {prevMonth, nextMonth, setMonth, setYear} = expensePageSlice.actions;

export default expensePageSlice.reducer;