import { configureStore } from '@reduxjs/toolkit';
import isLogined from '../modules/isLogined';
import countrySlice from '../modules/countrySlice';

const store = configureStore({
    reducer: {
        isLogined,
        countrySlice,
    },
});

export default store;
