import React, {useEffect, useState} from 'react';
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {useAuth} from "../../hook/useAuth";
import {useNavigate} from "react-router";
import logo from '../../img/logo.png';
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

    // смена темы
    const toggleTheme = () => {
        dispatch(setMode())
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
                <Toolbar  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pl: '0 !important', pr: '5px !important'}}>
                    <Box className='logo'>
                        <img src={logo} alt="iBoard" style={{width: '190px'}}/>
                        {/*<Typography component="div" sx={{fontWeight: 600}}>GUARDIAN</Typography>*/}
                        <Typography component="div" sx={{fontWeight: 600, fontSize: '14px'}}>DASHBOARD</Typography>
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