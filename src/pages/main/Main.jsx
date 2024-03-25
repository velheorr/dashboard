import React, {useEffect} from 'react';
import './main.scss'
import {useDispatch, useSelector} from "react-redux";
import {Filters} from "./subpages/Filters";
import { Typography} from "@mui/material";

import {
	getData,
	setFilteredDataChart,
	setFilteredKontragentByHolding,
	setHoldings,
	setKontragent
} from "./MainSlice";
import {useGetQuery} from "../../hook/useGetQuery";
import {prepareSelect} from "../../utils/func";
import {settings} from "../../elements/slider/sliderSettings";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../elements/slider/slider.scss'
import ChartBlocks from "./subpages/ChartBlocks";
import Skelet from "../../elements/Skelet";


const Main = () => {
	const dataFromDB = useSelector(state => state.mainData.dataFromDB);
	const filteredDatabyKontragentChart = useSelector(state => state.mainData.filteredDatabyKontragentChart);
	const dispatch = useDispatch();
	const {data, isLoading, isError} = useGetQuery()

	useEffect(()=>{
		dispatch(getData(data))
		if (dataFromDB !== undefined){
			 dispatch(setHoldings(prepareSelect(dataFromDB, 'Холдинг')))
			 dispatch(setKontragent(prepareSelect(dataFromDB, 'Контрагент')))
			 dispatch(setFilteredKontragentByHolding(prepareSelect(dataFromDB, 'Контрагент')))
			 dispatch(setFilteredDataChart(dataFromDB))
		}
	}, [data, dataFromDB])


	if (isLoading) {return <Skelet/>}
	if (isError) {return <h3>error</h3>}
	if (!data) {return <h3>no data</h3>}


	return (
		<div className='main'>




			<Filters  />
			<Typography sx={{textAlign: 'center', fontWeight: 600}} variant="h5">Список объектов</Typography>

			<Slider {...settings}>
				{
					isLoading
						? <div>Нет данных</div>
						:filteredDatabyKontragentChart?.map((item, i) => {
							return <ChartBlocks item={item} key={i}/>
						})
				}
			</Slider>

		</div>
	);
};

export default Main;


