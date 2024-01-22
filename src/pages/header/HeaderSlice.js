import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    darkTheme: false,
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
       changeTheme: (state) => {state.darkTheme = !state.darkTheme},
    },
});

const {actions, reducer} = headerSlice;

export default reducer;
export const {
    changeTheme,
} = actions;