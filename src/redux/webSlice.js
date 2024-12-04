import {createSlice} from '@reduxjs/toolkit';

import theme from '../../config/theme';

export const webSlice = createSlice({
    name: 'web',
    initialState: {
        theme: 'purple',
        page: '/'
    },
    reducers: {
        changeTheme: function(state, action) {
            const themes = Object.keys(theme);
            state.theme = themes.includes(action.payload) ? action.payload : 'purple';
        },
        changePage: function(state, action) {
            state.page = action.payload;
        }
    }
});

export const {changeTheme, changePage} = webSlice.actions;

export default webSlice.reducer;