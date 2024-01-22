import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {useAuth} from "../../hook/useAuth";
import {useNavigate} from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import TuneIcon from '@mui/icons-material/Tune';

import './header.scss'
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from './HeaderSlice'


const Header = () => {
    const navigate = useNavigate();
    const {signOut} = useAuth()

    const [darkTheme, setDarkTheme] = useState(false)
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.header.darkTheme);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme)
        dispatch(changeTheme())
    }

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
        <Box sx={{ flexGrow: 1, mb: '70px' }}>
            <AppBar position="fixed" sx={{background: '#5d8d5e'}}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div className='logo'>
                        <Typography component="div" >
                            GUARDIAN
                        </Typography>
                        <Typography component="div" >
                            DASHBOARD
                        </Typography>
                    </div>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'space-between'}}>
                        <Typography component="div" sx={{pl: '24px'}}>
                            {ruDate}
                        </Typography>
                        <Typography variant="h6" component="div" >
                            Главное меню
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <Tooltip title="Настройки светофора" size="large">
                                <IconButton color={'inherit'}>
                                    <TuneIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Смена темы" size="large" onClick={toggleTheme}>
                                <IconButton color={'inherit'}>
                                    {currentTheme? <LightModeIcon/> : <ModeNightIcon />}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Выйти из аккаунта" size="large" onClick={handleLogout}>
                                <IconButton color={'inherit'}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography  component="div" sx={{flexGrow: 1}}>
                                {formattedTime}
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;