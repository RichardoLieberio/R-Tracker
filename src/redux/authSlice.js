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
        },
        setUserInfo: function(state, action) {
            state.userInfo = action.payload;
        },
        clearUserInfo: function(state) {
            state.userInfo = null;
        }
    }
});

export const {setAccessToken, clearAccessToken, setUserInfo, clearUserInfo} = authSlice.actions;

export default authSlice.reducer;