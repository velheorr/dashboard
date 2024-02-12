import React, {useEffect} from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../main.scss'
import {useNavigate} from "react-router";
import Chart from "../../../elements/Chart";

import {useSelector} from "react-redux";
import BlockShadow from "../../../elements/BlockShadow";
import {palette} from "../../../utils/theme";



const DetailedView = () => {
    const navigate = useNavigate();
    const currentItem = useSelector(state => state.mainData.currentItem);
    const mode = useSelector(state => state.header.mode);

    useEffect(()=>{
        if (Object.keys(currentItem).length === 0) {
            // Объект пуст
            navigate('/')
        }
    },[currentItem])

    console.log(currentItem)

    return (
        <div className='main'>
            <Button onClick={() => navigate('/')} variant="outlined" color="success" size='small' startIcon={<ArrowBackIcon />}>Назад</Button>
            <BlockShadow>
                <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black}}
                            noWrap
                            align='center'
                            variant="h6"
                            gutterBottom>
                    {currentItem.НаименованиеОбъекта}
                </Typography>
                {currentItem? <Chart item={currentItem}/> : <div>no data</div>}
            </BlockShadow>
            <BlockShadow>
                <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black}}
                            noWrap
                            align='center'
                            variant="h6"
                            gutterBottom>
                    Параметры проекта (факт / план)
                </Typography>
                <List>
                    <ListItem disablePadding divider>
                        <ListItemButton>
                            <ListItemText primary="Коэффициент сложности Объекта:" />
                            <ListItemText primary="54654" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                        <ListItemButton>
                                <ListItemText primary="Коэффициент эффективности:" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                        <ListItemButton>
                            <ListItemText primary="Количество персонала на объекте:" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                        <ListItemButton>
                            <ListItemText primary="Количество ИТР на объекте:" />
                            <ListItemText primary="564%" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding divider>
                        <ListItemButton>
                            <ListItemText primary="Запроцентовано, руб:" />
                            <ListItemText primary="52 154" />
                        </ListItemButton>
                    </ListItem>
                </List>



            </BlockShadow>

        </div>
    )
};

export default DetailedView;