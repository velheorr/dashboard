import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const { REACT_APP_API_1C, REACT_APP_API_MONGO } = process.env;




const initialState = {
    dataFromDB: [],
    selectHolding: [],
    selectKontragent: [],
    filteredKontragentByHolding: [],
    filteredDatabyKontragentChart: [],
    currentItem: {}
}

const mainSlice = createSlice({
    name: 'mainData',
    initialState,
    reducers: {
        getData: (state, action) => {
            state.dataFromDB = action.payload
        },
        setHoldings: (state,action) => {
            state.selectHolding = action.payload
        },
        setKontragent: (state,action) => {
            state.selectKontragent = action.payload
        },
        setFilteredKontragentByHolding: (state,action) => {
            state.filteredKontragentByHolding = action.payload
        },
        setFilteredDataChart: (state,action) => {
            state.filteredDatabyKontragentChart = action.payload
        },
        setItem:  (state,action) => {
            state.currentItem = action.payload
        },
    },
    extraReducers: (builder) => {
/*        builder
            .addCase(fetchData.fulfilled, (state, action) =>{
                state.dataFromDB = action.payload
            })*/
    }
});

const {actions, reducer} = mainSlice;

export default reducer;
export const {
    getData,setHoldings, setKontragent,setFilteredKontragentByHolding, setFilteredDataChart, setItem
} = actions;