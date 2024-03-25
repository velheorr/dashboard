import React, {useEffect, useState} from 'react';
import {AppBar, Box, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {useAuth} from "../../hook/useAuth";
import {useNavigate} from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import TuneIcon from '@mui/icons-material/Tune';

import './header.scss'
import {useDispatch, useSelector} from "react-redux";
import {setMode} from './HeaderSlice'
import {palette} from "../../utils/theme";


const Header = () => {
    const navigate = useNavigate();
    const {signOut} = useAuth()
    const dispatch = useDispatch();
    const mode = useSelector(state => state.header.mode);

    // смена темы
    const toggleTheme = () => {
        dispatch(setMode())
    }

    // разлогинить
    const handleLogout = () => {
        signOut(()=> navigate('/', {replace: true}));
    }

    const [time, setTime] = useState(new Date())
    const formattedTime = time.toLocaleTimeString().substring(0, 5);

    useEffect(() => {
        window.setInterval(() => setTime(new Date()), 60 * 1000);
    }, []);

    const ruDate = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
        .format(new Date())
        .replace(/(\u0433\.?)/, "");

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative" sx={{background: mode === "dark" ? palette.grey[500] : palette.grey[700]}}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '0 !important'}}>
                    <Box className='logo'>
                        <Typography component="div" sx={{fontWeight: 600}}>GUARDIAN</Typography>
                        <Typography component="div" sx={{fontWeight: 600}}>DASHBOARD</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'space-between',
                        color: mode === "dark" ? palette.white : palette.black}}
                    >
                        <Box sx={{pl: '24px'}}>
                            <Typography  component="div">{formattedTime}</Typography>
                            <Typography component="div">{ruDate}</Typography>
                        </Box>

                        <Typography variant="h6" component="div" sx={{fontWeight: 600}}>Главное меню</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <Tooltip title="Настройки светофора" size="large">
                                <IconButton color={'inherit'}>
                                    <TuneIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Смена темы" size="large" onClick={toggleTheme}>
                                <IconButton color={'inherit'}>
                                    {mode === 'light'? <LightModeIcon/> : <ModeNightIcon />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Выйти из аккаунта" size="large" onClick={handleLogout}>
                                <IconButton color={'inherit'}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;