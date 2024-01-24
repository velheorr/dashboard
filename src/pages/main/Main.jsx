import React, {useEffect, useState} from 'react';
import Chart from "../chart/Chart";

import './main.scss'
import {useSelector} from "react-redux";
import {Filters} from "./subpages/Filters";
import {Box, Paper, Typography} from "@mui/material";
import SimpleSlider from "./subpages/slider/Slider";
import {fetchData} from "./MainSlice";
import axios from "axios";

const Main = () => {

/*	async function fetchCatalog(){   // загрузка всего каталога
		const x = await fetchData()
		console.log(x)
	}

	useEffect(()=>{
		/!*const data  = fetchData()
		console.log(data)*!/
		fetchCatalog()
	}, [])*/

	const [post, updatePost] = useState({title: ''})

	/*useEffect(() => {
		axios.get("https://mail.grdn.ru:777/upp_hs_ap/hs/v3/GetBlocSales")
			.then(({ data }) => {
				updatePost(data)
				console.log(data)
				console.log(post)
			})

	}, [post])*/

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


