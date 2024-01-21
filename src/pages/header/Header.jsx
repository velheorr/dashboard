import React, {useEffect, useState} from 'react';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import {useAuth} from "../../hook/useAuth";
import {useNavigate} from "react-router";
import LogoutIcon from '@mui/icons-material/Logout';


import './header.scss'


function MenuIcon() {
    return null;
}

const Header = () => {
    const navigate = useNavigate();
    const {signOut} = useAuth()
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
            <AppBar position="fixed" sx={{background: '#0b7700'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        GUARDIAN DASHBOARD
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {ruDate}
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Главное меню?
                    </Typography>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {formattedTime}
                    </Typography>
                    <Box>
                        <Tooltip title="Выйти из приложения" onClick={handleLogout}>
                            <IconButton color={'inherit'}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Выйти из приложения" onClick={handleLogout}>
                            <IconButton color={'inherit'}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;