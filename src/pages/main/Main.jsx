import React, {useState} from 'react';
import Chart from "../chart/Chart";

import './main.scss'
import {useSelector} from "react-redux";

const Main = () => {


	const [] = useState(true)
	const darkTheme = useSelector(state => state.header.darkTheme);
	const theme = darkTheme ? 'dark' : null;


	return (
		<div className={`main ${theme}`}>
			<Chart/>
		</div>
	);
};

export default Main;