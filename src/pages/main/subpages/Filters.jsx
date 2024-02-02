import React, {useEffect} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {palette} from "../../../utils/theme";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredDatabyKontragentChart, setFilteredKontragentByHolding} from "../MainSlice";
import {prepareSelect} from "../../../utils/func";

const Filters = () => {
    const mode = useSelector(state => state.header.mode);
    const selectHolding = useSelector(state => state.mainData.selectHolding);
    const selectKontragent = useSelector(state => state.mainData.selectKontragent);
    const filteredKontragentByHolding = useSelector(state => state.mainData.filteredKontragentByHolding);
    const dataFromDB = useSelector(state => state.mainData.dataFromDB);
    const filteredDatabyKontragentChart = useSelector(state => state.mainData.filteredDatabyKontragentChart);

    const dispatch = useDispatch();

    const [holding, setHolding] = React.useState('');
    const [zakazchik, setZakazchik] = React.useState('');


    const filterDataChart = (data, byHolding = false, byKontragent = false,) => {
        let dataFilterChart = [];
        const datafilter = (by, obj, target)=> {
            return  by.filter(item => item[obj] === target)
        }
        if (byHolding) {
            dataFilterChart = datafilter(data, 'Холдинг', byHolding)
        }
        if (byKontragent) {
            dataFilterChart = datafilter(dataFilterChart.length > 0 ? dataFilterChart : data, 'Контрагент', byKontragent)
        }

        dispatch(setFilteredDatabyKontragentChart(dataFilterChart))
    }


    const handleChangeHolding = (event) => {
        dispatch(setFilteredKontragentByHolding(prepareSelect(dataFromDB, 'Контрагент', event.target.value)))
        setHolding(event.target.value);
        /*const dataFilterChart = dataFromDB.filter(item => item.Холдинг === event.target.value)
        dispatch(setFilteredDatabyKontragentChart(dataFilterChart))*/
        filterDataChart(dataFromDB, event.target.value, false)
    };
    const handleChangeZakazchik = (event) => {
        setHolding(dataFromDB.find(item => item.Контрагент === event.target.value).Холдинг)
        setZakazchik(event.target.value);
        /*const dataFilterChart = filteredDatabyKontragentChart.filter(item => item.Контрагент === event.target.value)
        dispatch(setFilteredDatabyKontragentChart(dataFilterChart))*/
        filterDataChart(dataFromDB, false, event.target.value)
    };


    return (
        <div>
            <Box sx={{minWidth: 120, mb: '20px', }}>
                <FormControl sx={{m:1, width: 300,}} variant="standard">
                    <InputLabel id="holding-label" sx={{color: mode === "dark" ? palette.white : palette.black}}>Холдинг</InputLabel>
                    <Select
                        labelId="holding-label"
                        id="holding"
                        value={holding}
                        onChange={handleChangeHolding}
                        sx={{color: mode === "dark" ? palette.white : palette.black,}}
                    >
                        {/*<MenuItem value="X"><em>Не выбран</em></MenuItem>*/}
                        {
                            selectHolding.map((item, i) => {
                                let x = item === '' ? 'Не указан' : item
                                return <MenuItem key={i} value={item}>{x}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{m:1, width: 300}} variant="standard">
                    <InputLabel id="zakazchik-label" sx={{color: mode === "dark" ? palette.white : palette.black}}>Заказчик</InputLabel>
                    <Select
                        labelId="zakazchik-label"
                        id="zakazchik"
                        value={zakazchik}
                        onChange={handleChangeZakazchik}
                        sx={{color: mode === "dark" ? palette.white : palette.black}}
                    >
                        {/*<MenuItem value="X"><em>Не выбран</em></MenuItem>*/}
                        {
                            filteredKontragentByHolding.map((item, i) => {
                                return <MenuItem key={i} value={item}>{item}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </Box>

        </div>
    );
};

export {Filters};