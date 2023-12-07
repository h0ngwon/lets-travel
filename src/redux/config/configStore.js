import { configureStore } from '@reduxjs/toolkit';
import isLogined from '../modules/isLogined';

const store = configureStore({
    reducer: {
        isLogined,
    },
});

export default store;
