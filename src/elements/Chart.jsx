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
	ReferenceLine, Label, LabelList
} from 'recharts';

const Chart = ({item}) => {
	/*const {ОбъемРабот, СрокиКонтракта, НаличиеМатериалов, ПроцентПредъявленныхРТИУ, ПроцентПринятыхРТИУ, ...items} = {item};
	console.log(ОбъемРабот)*/
	let data = []
	const checkNum = (num) => {
		if (num > 125){
			return 125
		} else {return num}
	}

	if (item){
		data.push(
			{
				name: 'Обьем работ, %',
				uv:  checkNum(item.ОбъемРабот),
				realNumber: item.ОбъемРабот
			},
			{
				name: 'Сроки контракта, %',
				uv:  checkNum(item.СрокиКонтракта),
				realNumber: item.СрокиКонтракта,
			},
			{
				name: 'Наличие материалов, %',
				uv: checkNum(item.НаличиеМатериалов),
				realNumber: item.НаличиеМатериалов,
			},
			{
				name: 'Процентование предьявлено, %',
				uv: checkNum(item.ПроцентПредъявленныхРТИУ),
				realNumber: item.ПроцентПредъявленныхРТИУ,
			},
			{
				name: 'Процентование принято, %',
				uv: checkNum(item.ПроцентПринятыхРТИУ),
				realNumber: item.ПроцентПринятыхРТИУ,
			},
		)
	}


	const CustomTooltip = ({ active, payload, label }) => {
		let x= label?.slice(0, -3)
		if (active && payload && payload.length) {
			let newLabel = payload[0]?.payload.realNumber || payload[0].value
			return (
				<div className="custom-tooltip">
					<p className="label">{`${x}: ${newLabel}%`}</p>
				</div>
			);
		}
		return null;
	};

	const CustomLabel = (props) =>{
		const {x, y, name, width} = props;
		let find = data.find(num => num.name ===  name).realNumber
		if (width < 20){
			return <text x={x} y={y} dy={28} dx={width + 10} fill={'black'} fontSize={14} textAnchor="middle">{find}</text>
		} else {
			return <text x={x} y={y} dy={28} dx={width - 20} fill={'black'} fontSize={14} textAnchor="middle">{find}</text>
		}
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
					{/*allowDataOverflow={true}  dataKey={data.uv}*/}
					<XAxis type="number" dataKey='uv'  domain={[0, dataMax => (125)]} scale={'linear'}/>
					<YAxis dataKey="name" type='category' width={100}  style={{ fontSize: "13px"}}/>
					<Tooltip dataKey="uv" content={<CustomTooltip/>}/>
					{/*<Bar dataKey="uv"  label={{ position: 'insideRight', fill: 'white', offset: '10'}}>*/}
					<Bar dataKey="uv"  label={<CustomLabel />}>

					{/*<Bar dataKey="uv"  >*/}
						{data.map((entry, index) => (
							<Cell cursor="pointer" fill={entry.realNumber > 100 ? '#F60209' : '#7C7C7C'} key={`cell-${index}`} interval={0} />

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





