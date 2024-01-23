import React, {useState} from 'react';
import Chart from "../chart/Chart";

import './main.scss'
import {useSelector} from "react-redux";

const Main = () => {
	const [] = useState(true)
	const mode = useSelector(state => state.header.mode);
	const theme = mode ? 'dark' : null;


	return (
		<div className='main'>
			<Chart/>
		</div>
	);
};

export default Main;