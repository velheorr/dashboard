import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    dataFromDB: [],
    filteredData: [],

    selectHolding: [],
    selectKontragent: [],

    filteredDatabyKontragentChart: [],
    currentItem: {}
}

const mainSlice = createSlice({
    name: 'mainData',
    initialState,
    reducers: {
        /*глафная информация*/
        getData: (state, action) => {
            state.dataFromDB = action.payload
        },
        /*отфильтрованный массив*/
        setFilteredData: (state, action) => {
            state.filteredData = action.payload
        },

        /*установить список холдингов*/
        setHoldings: (state,action) => {
            state.selectHolding = action.payload
        },
        /*установить список заказчиков/контрагенитов*/
        setKontragent: (state,action) => {
            state.selectKontragent = action.payload
        },

        /*detailed view*/
        setItem:  (state,action) => {
            state.currentItem = action.payload
        },
    },
});

const {actions, reducer} = mainSlice;

export default reducer;
export const {
    getData,setHoldings, setKontragent, setFilteredData, setItem,
} = actions;