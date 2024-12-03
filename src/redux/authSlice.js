import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        accessToken: null,
        isAuthenticated: false,
        isAdmin: false
    },
    reducers: {
        setAccessToken: function(state, action) {
            state.accessToken = action.payload;
        },
        clearAccessToken: function(state) {
            state.accessToken = null;
        },
        setUserInfo: function(state, action) {
            state.userInfo = action.payload;
            state.isAdmin = state.userInfo.role === 'admin';
        },
        clearUserInfo: function(state) {
            state.userInfo = null;
            state.isAdmin = false;
        },
        setAuthentication: function(state, action) {
            state.isAuthenticated = action.payload;
        }
    }
});

export const {setAccessToken, clearAccessToken, setUserInfo, clearUserInfo, setAuthentication} = authSlice.actions;

export default authSlice.reducer;