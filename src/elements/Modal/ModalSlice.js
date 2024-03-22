import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    open: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        /*openModal: (state) => {
            state.open = state.open !== true;
        },*/
        openModal: (state) => {
            state.open = true;
        },
        closeModal: (state) => {
            state.open = false;
        },
    },
});

const {actions, reducer} = modalSlice;

export default reducer;
export const {
    openModal,closeModal
} = actions;