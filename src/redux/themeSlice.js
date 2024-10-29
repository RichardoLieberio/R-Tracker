import {createSlice} from '@reduxjs/toolkit';

import theme from '../theme';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        color: theme['purple']
    },
    reducers: {
        changeColor: function(state, action) {
            state.color = action.payload.color in theme ? theme[action.payload.color] : theme['purple'];
        }
    }
});

export const {changeColor} = themeSlice.actions;

export default themeSlice.reducer;