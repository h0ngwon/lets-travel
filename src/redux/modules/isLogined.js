import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLogin: false };

const isLoginedSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        login: (state, action) => {
            return { ...state, isLogin: true };
        },
        logout: (state, action) => {
            return { ...state, isLogin: false };
        },
    },
});

export default isLoginedSlice.reducer;
export const { login, logout } = isLoginedSlice.actions;
