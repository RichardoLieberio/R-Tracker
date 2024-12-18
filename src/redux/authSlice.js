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
        setName: function(state, action) {
            state.userInfo.name = action.payload;
        },
        setEmail: function(state, action) {
            state.userInfo.email = action.payload;
        },
        setAuthentication: function(state, action) {
            state.isAuthenticated = action.payload;
        },
        logout: function(state) {
            state.userInfo = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.isAdmin = false;
        }
    }
});

export const {setAccessToken, clearAccessToken, setUserInfo, clearUserInfo, setName, setEmail, setAuthentication, logout} = authSlice.actions;

export default authSlice.reducer;