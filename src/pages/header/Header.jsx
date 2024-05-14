import React, {useEffect, useState} from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useAuth} from "../../hook/useAuth";
import {useNavigate} from "react-router";
import logoLight from '../../img/header/logoLight.png';
import logoDark from '../../img/header/logoDark.png';
import './header.scss'
import {useDispatch, useSelector} from "react-redux";
import {setMode} from './HeaderSlice'
import {palette} from "../../utils/theme";
import DropMenu from "./DropMenu";


const Header = () => {
    const navigate = useNavigate();
    const {signOut} = useAuth()
    const dispatch = useDispatch();
    const mode = useSelector(state => state.header.mode);

    const userName = localStorage.getItem('name') || ''

    /* получить текущую тему*/
    const getTheme = ()=>{
        return  JSON.parse(localStorage.getItem('theme'))
    }

    const toggleTheme = () => {
        let theme = JSON.parse(localStorage.getItem('theme'))
        let toggle = !theme
        localStorage.setItem('theme', JSON.stringify(toggle));
        dispatch(setMode(toggle))
    }

    // разлогинить
    const handleLogout = () => {
        localStorage.setItem('auth', JSON.stringify(false));
        signOut(()=> navigate('/', {replace: true}));
    }

    const [time, setTime] = useState(new Date())
    const formattedTime = time.toLocaleTimeString().substring(0, 5);

    useEffect(() => {
        window.setInterval(() => setTime(new Date()), 60 * 1000);
        dispatch(setMode(getTheme()))
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
                <Toolbar  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '0 !important', pr: '0 !important'}}>
                    <Box className='logo'>
                        <img src={mode === "dark" ? logoDark : logoLight} alt="iBoard" style={{width: '190px'}}/>
                        <Typography component="div" sx={{fontWeight: 600, fontSize: '14px', color: '#4cb242'}}>DASHBOARD</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'space-between',
                        color: mode === "dark" ? palette.white : palette.black}}
                    >
                        <Box sx={{pl: '24px'}}>
                            <Typography  component="div">{formattedTime}</Typography>
                            <Typography component="div">{ruDate}</Typography>
                        </Box>

                        <Typography variant="h6" component="div" sx={{fontWeight: 600}}>Главное меню</Typography>

                        <DropMenu userName={userName} toggleTheme={toggleTheme} handleLogout={handleLogout}/>

                        {/*<Box sx={{ display: 'flex', alignItems: 'center'}}>
                            <ThemeSwitch toggleTheme={toggleTheme}/>
                            <div>{userName}</div>
                            <Tooltip title={<Typography variant="body2" gutterBottom>Выйти из аккаунта</Typography>}>
                                <IconButton color={'inherit'} onClick={handleLogout}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>*/}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;