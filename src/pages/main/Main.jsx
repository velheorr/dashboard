import React, {useState} from 'react';
import Chart from "../chart/Chart";

import './main.scss'
import {useSelector} from "react-redux";
import {Filters} from "./subpages/Filters";
import {Box, Paper, Typography} from "@mui/material";
import SimpleSlider from "./subpages/slider/Slider";

const Main = () => {
	const [] = useState(true)

	return (
		<div className='main'>
			<Filters/>
			<Typography sx={{textAlign: 'center'}} variant="h6">Список объектов</Typography>
			<SimpleSlider/>




			<Chart/>

		</div>
	);
};

export default Main;


