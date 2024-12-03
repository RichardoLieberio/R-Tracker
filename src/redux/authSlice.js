import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: null,
        accessToken: null,
        isAuthenticated: false
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
        },
        clearUserInfo: function(state) {
            state.userInfo = null;
        },
        setAuthentication: function(state, action) {
            state.isAuthenticated = action.payload;
        },
        isAdmin: function(state) {
            return !!state.userInfo.role === 'admin';
        }
    }
});

export const {setAccessToken, clearAccessToken, setUserInfo, clearUserInfo, setAuthentication, isAdmin} = authSlice.actions;

export default authSlice.reducer;