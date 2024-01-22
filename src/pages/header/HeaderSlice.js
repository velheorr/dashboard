import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
});

const {actions, reducer} = headerSlice;

export default reducer;
export const {
    setMode,
} = actions;