import {useEffect, useState} from 'react';
import '../../layout.scss'
import  '../main.scss'
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
    Typography
} from "@mui/material";
import {palette} from "../../../utils/theme";
import {useDispatch, useSelector} from "react-redux";
import {
    setFilteredData,
    setKontragent,
} from "../MainSlice";
import {prepareSelect} from "../../../utils/func";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useModal} from "../../../hook/useModal";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {GFormControl, GInputLabel, GTextField} from "../../../elements/CustomMui/customMui";


const Filters = () => {
    const mode = useSelector(state => state.header.mode);
    const selectHolding = useSelector(state => state.mainData.selectHolding);
    const selectKontragent = useSelector(state => state.mainData.selectKontragent);
    const filteredData = useSelector(state => state.mainData.filteredData);
    const dataFromDB = useSelector(state => state.mainData.dataFromDB);
    const dispatch = useDispatch();

    /*отображение кол-ва обьектов*/
    const [amount, setAmount] = useState(0)

    useEffect(()=>{
        if (filteredData){
            setAmount(filteredData.length)
        }
    }, [filteredData])

    const [holding, setHolding] = useState('Все');
    const [zakazchik, setZakazchik] = useState('Все');

    /*ф-я фильтра, используется селектом холдинга*/
    const funcChangeHolding = (item)=>{
        let forFilter = []
        const doFilter = (param)=>{
            return dataFromDB.filter(i => i.Холдинг === param)
        }
        if(item === 'ПРОЧИЕ' || item === ''){forFilter = doFilter('ПРОЧИЕ').concat(doFilter(''))}
        else if (item === 'Все'){forFilter = dataFromDB}
        else {forFilter = doFilter(item)}
        return forFilter
    }
    /*ф-я селекта холдинга*/
    const handleChangeHolding = (e = false, fromZakazchik)=>{
        const item = e ? e.target.value : fromZakazchik
        setHolding(item);
        setZakazchik('Все')
        const filtered = funcChangeHolding(item)
        dispatch(setFilteredData(filtered))
        dispatch(setKontragent(prepareSelect(filtered, 'Контрагент')))
    }
    /*ф-я селекта заказчика*/
    const handleChangeZakazchik = (e)=>{
        const item = e.target.value
        setZakazchik(item);
        const filteredByHolding = funcChangeHolding(holding)

        let forFilter = []
        const doFilter = (param)=>{
            return filteredByHolding.filter(i => i.Контрагент === param)
        }

        if (item === 'Все'){forFilter = filteredByHolding}
        else {forFilter = doFilter(item)}

        dispatch(setFilteredData(forFilter))
    }

    const {setModal} = useModal()

    /*Поиск*/
    const [search, setSearch] = useState('')
    /*Очистка поля поиска*/
    const resetSearch = ()=> {
        setSearch('')
        dispatch(setFilteredData(dataFromDB))
        handleChangeHolding(false, "Все")
    }
    /*Обновление поля поиска*/
    const handleSearch = (e) =>{
        e.preventDefault()
        setSearch(e.target.value)
    }
    /*ф-я поиска*/
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && search.length > 2) {
            const searchedData = filteredData.filter(i => {
                return i.НаименованиеОбъекта.toLowerCase().includes(search.toLowerCase()) || i.КодОбъекта.includes(search)
            })
            dispatch(setFilteredData(searchedData))
        }
    }

    return (
            <Box sx={{minWidth: 120, mb: '10px'}} className='mainFilters'>
                <div>
                    <GFormControl sx={{width: 300,mr: '15px', }} variant="standard" >
                   {/* <FormControl sx={{width: 300,mr: '15px'}} variant="standard">*/}
                        <GInputLabel sx={{color: mode === "dark" ? palette.white : palette.black}}>Холдинг</GInputLabel>
                        {/*<InputLabel id="holding-label" sx={{color: mode === "dark" ? palette.white : palette.black}}>Холдинг</InputLabel>*/}
                        <Select
                            labelId="holding-label"
                            id="holding"
                            value={holding}
                            defaultValue='Все'
                            onChange={handleChangeHolding}
                            sx={{color: mode === "dark" ? palette.white : palette.black,}}
                        >
                            <MenuItem value={'Все'}><b>Все холдинги</b></MenuItem>
                            {
                                selectHolding.map((item, i) => {
                                    return <MenuItem key={i} value={item}>{item}</MenuItem>
                                })
                            }
                        </Select>
                    {/*</FormControl>*/}
                    </GFormControl>
                    {/*<FormControl sx={{width: 300,mr: '15px'}} variant="standard">*/}
                   <GFormControl sx={{width: 300,mr: '15px'}} variant="standard">
                        {/*<InputLabel id="zakazchik-label" sx={{color: mode === "dark" ? palette.white : palette.black}}>Заказчик</InputLabel>*/}
                       <GInputLabel id="zakazchik-label" sx={{color: mode === "dark" ? palette.white : palette.black}}>Заказчик</GInputLabel>
                        <Select
                            labelId="zakazchik-label"
                            id="zakazchik"
                            value={zakazchik}
                            defaultValue='Все'
                            onChange={handleChangeZakazchik}
                            sx={{color: mode === "dark" ? palette.white : palette.black}}
                        >
                            <MenuItem  value={'Все'}><b>Все заказчики</b></MenuItem>
                            {
                                selectKontragent.map((item, i) => {
                                    return <MenuItem key={i} value={item}>{item}</MenuItem>
                                })
                            }
                        </Select>
                    {/*</FormControl>*/}
                    </GFormControl>
                </div>

                <div className='searchFilter'>
                    <GTextField id="realiz_search" sx={{pt: '15px', width: '300px', pr: '15px'}}  variant="standard" placeholder='Поиск' value={search}
                        onKeyDown={handleKeyDown}  onChange={handleSearch} InputProps={{
                        startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
                        endAdornment:(<InputAdornment position="end"><IconButton onClick={resetSearch}><CloseIcon /></IconButton></InputAdornment>)
                    }}/>
                    <div className='objects'><b>Объектов: {amount}</b></div>

                    <Tooltip title={<Typography variant="body2" gutterBottom>Описание GuardianDashboard</Typography>}>
                        <span style={{float: "right", paddingTop: '15px'}}><IconButton onClick={()=> {setModal('mainPage')}} size="small" sx={{color: mode === "dark" ? palette.white : palette.grey}}><HelpOutlineIcon /></IconButton></span>
                    </Tooltip>
                </div>

            </Box>
    );
};

export {Filters};