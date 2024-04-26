import {useEffect} from 'react';
import '../layout.scss'
import {useDispatch, useSelector} from "react-redux";
import {Filters} from "./subpages/Filters";
import { Typography} from "@mui/material";

import {
	getData, setFilteredData,
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
	const filteredData = useSelector(state => state.mainData.filteredData);
	const dispatch = useDispatch();
	const {data, isLoading, isError} = useGetQuery()

	useEffect(()=>{
		dispatch(getData(data))
		if (data){
			dispatch(setFilteredData(data))
			 dispatch(setHoldings(prepareSelect(data, 'Холдинг')))
			 dispatch(setKontragent(prepareSelect(data, 'Контрагент')))
		}
	}, [data])


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
						:filteredData?.map((item, i) => {
							return <ChartBlocks item={item} key={i}/>
						})
				}
			</Slider>
		</div>
	);
};

export default Main;


