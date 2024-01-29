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
import MainSlider from "./subpages/MainSlider";
import {settings} from "./subpages/slider/sliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './subpages/slider/slider.scss'

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


	if (isLoading) {return <h3>loading...</h3>}
	if (isError) {return <h3>error</h3>}
	if (!data) {return <h3>no data</h3>}

	const renderCharts = () => {
		const x = []
		dataFromDB?.map((item, i) => {
			x.push(<Charts item={item} i={i}/>)
		})
		return x
	}
	const charts= renderCharts()

	return (
		<div className='main'>
			<Filters  />
			<Typography sx={{textAlign: 'center'}} variant="h6">Список объектов</Typography>

			<Slider {...settings}>
				{
					isLoading
						? <div>Нет данных</div>
						:dataFromDB?.map((item, i) => {
							return <Charts item={item} key={i}/>
						})
					  /*dataFromDB.map((item, i) => {
							<div key={i}>
								<div>{item.НаименованиеОбъекта}</div>
							</div>
						})*/
				}

			</Slider>




			<MainSlider/>



			<SimpleSlider data={<Chart/>}/>

			<Chart/>

		</div>
	);
};

export default Main;

const Charts = ({item})=>{
	return	<Paper elevation={3} sx={{display: 'inline-block', width: '50%'}} >
		<div>{item.НаименованиеОбъекта}</div>
	</Paper>
}
