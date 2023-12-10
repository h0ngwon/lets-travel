import { createSlice } from '@reduxjs/toolkit';

const initialState = '일본';

const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        setCountry: (state, action) => {
            const activeCountry = action.payload;
            return activeCountry;
        },
    },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
