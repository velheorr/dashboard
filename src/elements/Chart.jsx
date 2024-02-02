import React, {useEffect} from 'react';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine, Label
} from 'recharts';

const Chart = ({item}) => {
	/*const {ОбъемРабот, СрокиКонтракта, НаличиеМатериалов, ПроцентПредъявленныхРТИУ, ПроцентПринятыхРТИУ, ...items} = {item};
	console.log(ОбъемРабот)*/
	let data = []

	if (item){
		data.push(
			{
				name: 'Обьем работ, %',
				uv:  item.ОбъемРабот,
			},
			{
				name: 'Сроки контракта, %',
				uv:  item.СрокиКонтракта,
			},
			{
				name: 'Наличие материалов, %',
				uv: item.НаличиеМатериалов,
			},
			{
				name: 'Процентование предьявлено, %',
				uv: item.ПроцентПредъявленныхРТИУ,
			},
			{
				name: 'Процентование принято, %',
				uv: item.ПроцентПринятыхРТИУ,
			},
		)
	}


	const CustomTooltip = ({ active, payload, label }) => {
		let x= label?.slice(0, -3)
		if (active && payload && payload.length) {
			return (
				<div className="custom-tooltip">
					<p className="label">{`${x}: ${payload[0].value}%`}</p>
				</div>
			);
		}

		return null;
	};


	return (
		<div style={{ position: "relative", padding: '5px'}}>
			{/*width={700} height="80%"*/}
			<ResponsiveContainer width={'100%'}  height={300} minWidth={100} minHeight={100} >
				<BarChart
					width={500}
					height={300}
					data={data}
					layout="vertical"
					barSize={90}
				>
					<CartesianGrid strokeDasharray="3 3" />
					{/*allowDataOverflow={true}*/}
					<XAxis type="number" dataKey={data.uv}  domain={[0, dataMax => (125)]} scale={'linear'}/>
					<YAxis dataKey="name" type='category' width={100}  style={{ fontSize: "13px"}}/>
					<Tooltip content={<CustomTooltip/>}/>
					<Bar dataKey="uv"  label={{ position: 'insideRight', fill: 'white', offset: '10'}}>
						{data.map((entry, index) => (
							<Cell cursor="pointer" fill={entry.uv > 100 ? '#F60209' : '#7C7C7C'} key={`cell-${index}`} interval={0} />
						))}
					</Bar>
					<ReferenceLine x={100} stroke="black"    strokeWidth={2}>
						<Label value="100" offset={-18} position="insideBottom" />
					</ReferenceLine>
				</BarChart>
			</ResponsiveContainer>

		</div>
	);
};

export default Chart;





