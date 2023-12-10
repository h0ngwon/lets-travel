import { configureStore } from '@reduxjs/toolkit';
import countrySlice from '../modules/countrySlice';
import isLogined from '../modules/isLogined';

const store = configureStore({
    reducer: {
        isLogined,
        countrySlice,
    },
});

export default store;
