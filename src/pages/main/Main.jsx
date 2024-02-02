import React, {useEffect} from 'react';
import Chart from "../../elements/Chart";

import './main.scss'
import {useDispatch, useSelector} from "react-redux";
import {Filters} from "./subpages/Filters";
import {Typography} from "@mui/material";

import {getData, setFilteredKontragentByHolding, setHoldings, setKontragent} from "./MainSlice";
import {useGetQuery} from "../../hook/useGetQuery";
import {prepareSelect} from "../../utils/func";
import {settings} from "../../elements/slider/sliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../elements/slider/slider.scss'

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
			<Typography sx={{textAlign: 'center'}} variant="h5">Список объектов</Typography>

			<Slider {...settings}>
				{
					isLoading
						? <div>Нет данных</div>
						:dataFromDB?.map((item, i) => {
							return <Charts item={item} key={i}/>
						})
				}
			</Slider>
			{/*<MainSlider/>

			<SimpleSlider data={<Chart/>}/>*/}
		</div>
	);
};

export default Main;

const Charts = ({item})=>{
	return	<div style={{display: 'inline-block', width: '50%'}} >
		<div style={{boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)', margin: '5px'}}>
			{/*<div>{item.НаименованиеОбъекта}</div>*/}
			<Typography sx={{mt: 2}} align='center' variant="h6" gutterBottom>{item.НаименованиеОбъекта}</Typography>
			<Chart item={item}/>
		</div>
	</div>
}
