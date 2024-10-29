import {createSlice} from '@reduxjs/toolkit';

import theme from '../theme';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        color: 'purple'
    },
    reducers: {
        changeColor: function(state, action) {
            state.color = action.payload.color in theme ? action.payload.color : 'purple';
        }
    }
});

export const {changeColor} = themeSlice.actions;

export default themeSlice.reducer;