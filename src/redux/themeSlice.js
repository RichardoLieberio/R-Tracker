import {createSlice} from '@reduxjs/toolkit';

import theme from '../../config/theme';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        color: 'purple'
    },
    reducers: {
        changeColor: function(state, action) {
            const themes = Object.keys(theme);
            state.color = themes.includes(action.payload) ? action.payload : 'purple';
        }
    }
});

export const {changeColor} = themeSlice.actions;

export default themeSlice.reducer;