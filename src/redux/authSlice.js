import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        accessToken: null
    },
    reducers: {
        setAccessToken: function(state, action) {
            state.accessToken = action.payload;
        },
        clearAccessToken: function(state) {
            state.accessToken = null;
        }
    }
});

export const {setAccessToken, clearAccessToken} = authSlice.actions;

export default authSlice.reducer;