import React, {useEffect, useState} from 'react';
import Chart from "../chart/Chart";

import './main.scss'
import {useDispatch, useSelector} from "react-redux";
import {Filters} from "./subpages/Filters";
import {Box, Paper, Typography} from "@mui/material";
import SimpleSlider from "./subpages/slider/Slider";


import {getData, setFilteredKontragentByHolding, setHoldings, setKontragent} from "./MainSlice";
import {useGetQuery} from "../../hook/useGetQuery";
import {prepareSelect} from "../../utils/func";




const Main = () => {

	const dataFromDB = useSelector(state => state.mainData.dataFromDB);

	const dispatch = useDispatch();

	const {data, isLoading, isError} = useGetQuery()

	useEffect(()=>{
		dispatch(getData(data))
		if (dataFromDB !== undefined){
			 dispatch(setHoldings(prepareSelect(dataFromDB, 'Холдинг')))
			 dispatch(setKontragent(prepareSelect(dataFromDB, 'Контрагент')))
			 dispatch(setFilteredKontragentByHolding(prepareSelect(dataFromDB, 'Контрагент')))
		}
	}, [data, dataFromDB])


	if (isLoading) {return <h3>load</h3>}
	if (isError) {return <h3>error</h3>}
	if (!data) {return <h3>no data</h3>}



	return (
		<div className='main'>
			<Filters  />
			<Typography sx={{textAlign: 'center'}} variant="h6">Список объектов</Typography>
			<SimpleSlider data={<Chart/>}/>

			<Chart/>

		</div>
	);
};

export default Main;


