import React, {useEffect, useState} from 'react';
import '../main.scss'
import {Box, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography} from "@mui/material";
import {palette} from "../../../utils/theme";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredDataChart, setFilteredKontragentByHolding} from "../MainSlice";
import {prepareSelect} from "../../../utils/func";
import * as PropTypes from "prop-types";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useModal} from "../../../hook/useModal";

HelpOutlineIcon.propTypes = {fontSize: PropTypes.string};

const Filters = () => {
    const mode = useSelector(state => state.header.mode);
    const selectHolding = useSelector(state => state.mainData.selectHolding);
    const filteredKontragentByHolding = useSelector(state => state.mainData.filteredKontragentByHolding);
    const dataFromDB = useSelector(state => state.mainData.dataFromDB);

    const dispatch = useDispatch();

    const [holding, setHolding] = useState('');
    const [zakazchik, setZakazchik] = useState('');
    const [amount, setAmount] = useState(0)


    useEffect(()=>{
        if (dataFromDB){
            setAmount(dataFromDB.length)
        }
    }, [dataFromDB])

    const filterDataChart = (data, byHolding = false, byKontragent = false,) => {
        let dataFilterChart = [];
        const datafilter = (by, obj, target)=> {
            return  by.filter(item => item[obj] === target)
        }
        if (!byHolding && !byKontragent){
            dataFilterChart = data
        }
        if (byHolding) {
            dataFilterChart = datafilter(data, 'Холдинг', byHolding)
        }
        if (byKontragent) {
            dataFilterChart = datafilter(dataFilterChart.length > 0 ? dataFilterChart : data, 'Контрагент', byKontragent)
        }
        setAmount(dataFilterChart.length)
        dispatch(setFilteredDataChart(dataFilterChart))
    }


    const handleChangeHolding = (event) => {
        dispatch(setFilteredKontragentByHolding(prepareSelect(dataFromDB, 'Контрагент', event.target.value)))
        setHolding(event.target.value);
        if (event.target.value === ''){
            filterDataChart(dataFromDB, false, false)
        } else {
            filterDataChart(dataFromDB, event.target.value, false)
        }
    };
    const handleChangeZakazchik = (event) => {
        setHolding(dataFromDB.find(item => item.Контрагент === event.target.value).Холдинг)
        setZakazchik(event.target.value);
        filterDataChart(dataFromDB, false, event.target.value)
    };

    const {setModal} = useModal()

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
                        {
                            filteredKontragentByHolding.map((item, i) => {
                                return <MenuItem key={i} value={item}>{item}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{m:1, width: 300, verticalAlign: 'bottom', textAlign: 'right'}} >
                    <Typography sx={{ }} variant="body1">Всего объектов: {amount}</Typography>
                </FormControl>
                <Tooltip title={<Typography variant="body2" gutterBottom>Описание GuardianDashboard</Typography>}>
                    <span style={{float: "right", paddingTop: '15px'}}><IconButton onClick={()=> {setModal('mainPage')}} size="small" sx={{color: mode === "dark" ? palette.white : palette.grey}}><HelpOutlineIcon /></IconButton></span>
                </Tooltip>
            </Box>
        </div>
    );
};

export {Filters};