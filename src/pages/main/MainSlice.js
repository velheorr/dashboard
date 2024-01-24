import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";


const { REACT_APP_API_1C, REACT_APP_API_MONGO } = process.env;

export const fetchData = createAsyncThunk('catalog/fetchRepairJSON',async () =>{
        const res = await axios.get('https://mail.grdn.ru:777/upp_hs_ap/hs/v3/GetBlocSales');
        console.log(res)
        return res.data;
    }
)



const initialState = {
    dataFromDB: [],
}

const mainSlice = createSlice({
    name: 'mainData',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) =>{
                state.dataFromDB = action.payload
            })
    }
});

const {actions, reducer} = mainSlice;

export default reducer;
export const {
    setMode,
} = actions;