import React, {useEffect} from 'react';
import {Button, FormControl, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../main.scss'
import {useNavigate} from "react-router";
import Chart from "../../../elements/Chart";
import ChartBlocks from "./ChartBlocks";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const DetailedView = () => {
    const navigate = useNavigate();
    const currentItem = useSelector(state => state.mainData.currentItem);

    useEffect(()=>{
        if (Object.keys(currentItem).length === 0) {
            // Объект пуст
            navigate('/')
        }
    },[currentItem])

    return (
        <div className='main'>
            <Button onClick={() => navigate('/')} variant="outlined" color="success" startIcon={<ArrowBackIcon />}>Назад</Button>
            <Typography sx={{textAlign: 'center'}} variant="h5">Список объектов</Typography>
            <div style={{display: 'inline-block', width: '50%'}}>
                {currentItem? <Chart item={currentItem}/> : <div>no data</div>}
                {/*<Chart item={item}/>*/}
            </div>

        </div>
    )
};

export default DetailedView;