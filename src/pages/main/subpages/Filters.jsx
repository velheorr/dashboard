import React, {useEffect} from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {palette} from "../../../utils/theme";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredKontragentByHolding} from "../MainSlice";
import {prepareSelect} from "../../../utils/func";

const Filters = () => {
    const mode = useSelector(state => state.header.mode);
    const selectHolding = useSelector(state => state.mainData.selectHolding);
    const selectKontragent = useSelector(state => state.mainData.selectKontragent);
    const filteredKontragentByHolding = useSelector(state => state.mainData.filteredKontragentByHolding);
    const dataFromDB = useSelector(state => state.mainData.dataFromDB);

    const dispatch = useDispatch();

    useEffect(()=>{

    }, [filteredKontragentByHolding])

    const renderSelectHolding = selectHolding.map((item, i) => {
        let x = item === ''? 'Не указан' : item
        return <MenuItem key={i} value={x}>{x}</MenuItem>
    })
    const renderSelectKontragent = filteredKontragentByHolding.map((item, i) => {
        return <MenuItem key={i} value={item}>{item}</MenuItem>
    })



    const [holding, setHolding] = React.useState('');
    const [zakazchik, setZakazchik] = React.useState('');
    const handleChangeHolding = (event) => {
        dispatch(setFilteredKontragentByHolding(prepareSelect(dataFromDB, 'Контрагент', event.target.value)))
        setHolding(event.target.value);
    };
    const handleChangeZakazchik = (event) => {

        setZakazchik(event.target.value);
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
                        <MenuItem value=""><em>Пусто</em></MenuItem>
                        {renderSelectHolding}
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
                        <MenuItem value=""><em>Пусто</em></MenuItem>
                        {renderSelectKontragent}
                    </Select>
                </FormControl>
            </Box>

        </div>
    );
};

export {Filters};