import React from 'react';
import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	LabelList,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine
} from 'recharts';

const Chart = () => {
	const data = [
		{
			name: 'Обьем работ, %',
			uv: 152,
		},
		{
			name: 'Сроки контракта, %',
			uv: 100,
		},
		{
			name: 'Наличие материалов, %',
			uv: 78,
		},
		{
			name: 'Процентование предьявлено, %',
			uv: 24,
		},
		{
			name: 'Процентование принято, %',
			uv: 12,
		},

	];


	return (
		<div style={{ position: "relative", height: "500px" }}>
			<ResponsiveContainer width={700} height="80%" minWidth={100} minHeight={100} >
				<BarChart
					width={500}
					height={300}
					data={data}
					layout="vertical"
					barSize={90}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" dataKey={data.uv} allowDataOverflow={true} domain={[0, dataMax => (125)]}/>
					<YAxis dataKey="name" type='category' width={100}  style={{ fontSize: "13px"}}/>
					<ReferenceLine x={100} stroke="black" label={100} isFront={true} strokeWidth={2}/>
					<Tooltip />
					<Bar dataKey="uv"  label={{ position: 'insideEnd', fill: 'black'}}>
						{data.map((entry, index) => (
							<Cell cursor="pointer" fill={entry.uv > 100 ? '#82ca9d' : '#6664d8'} key={`cell-${index}`} interval={0} />
						))}
						{/*<LabelList
							dataKey="name"
							fill="#FFF"
							position="insideRight"
							formatter={(label) => {
								return label > 3 ? label : null;
							}}
						/>*/}
					</Bar>
					{/*<Bar dataKey="uv" fill="#8857d8" />*/}
					{/*<Bar dataKey="uv">
						<Cell key={data.name[0]}  fill='#8857d8'/>
						<Cell key={data.name[1]}  fill='#8833d8'/>
						<Cell key={data.name[2]} fill='#4733d8'/>
						<Cell key={data.name[3]}  fill='#5633d8'/>
						<Cell key={data.name[4]}  fill='#1233d8'/>
						<LabelList
							dataKey="name"
							fill="#FFF"
							position="insideRight"
							formatter={(label) => {
								return label > 3 ? label : null;
							}}
						/>
					</Bar>*/}
				</BarChart>
			</ResponsiveContainer>

		</div>
	);
};

export default Chart;





