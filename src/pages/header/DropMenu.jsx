import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import './header.scss'
import ThemeSwitch from "../../elements/ThemeSwitch/ThemeSwitch";
import {Divider, ListItemIcon, ListItemText} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {palette} from "../../utils/theme";




export default function DropMenu({userName, toggleTheme, handleLogout}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const mode = useSelector(state => state.header.mode);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className='disp' >
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <div className='name' style={{color: mode === "dark" ? palette.white : palette.black}}>{userName}</div>
                <div className='role' style={{color: mode === "dark" ? palette.white : palette.black}}>Администратор</div>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ width: 320}}
            >
                <MenuItem ><ThemeSwitch toggleTheme={toggleTheme} handleClose={handleClose}/></MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" sx={{color: mode === "dark" ? palette.white : palette.black}}/></ListItemIcon>
                    <ListItemText>Выход</ListItemText>
                </MenuItem>
            </Menu>
        </Box>
    );
}
