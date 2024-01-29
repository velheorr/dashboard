import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, LabelList,Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
	const dataW = [
		{
			name: 'Page A',
			uv: 4000,
		},
		{
			name: 'Page B',
			uv: 3000,
		},
		{
			name: 'Page C',
			uv: 2000,
		},
		{
			name: 'Page D',
			uv: 2780,
		},

	];


	return (
		<div style={{ position: "relative", height: "100%" }}>
			<ResponsiveContainer width={700} height="80%" minWidth={100} minHeight={100}>
				<BarChart width={300} height={500} data={dataW}
						  layout="vertical"
				>
					<XAxis  type="number" />
					<YAxis dataKey="name" type='category' />
					<Tooltip />
					<Bar dataKey="uv">
						<Cell key='ddfgdfg'  fill='#8857d8'/>
						<Cell key='ddfggdfg'  fill='#8833d8'/>
						<Cell key='ddwfgdfg' fill='#4733d8'/>
						<Cell key='d3dfgdfg'  fill='#5633d8'/>
						<LabelList
							dataKey="name"
							fill="#FFF"
							position="insideRight"
							formatter={(label) => {
								return label > 3 ? label : null;
							}}
						/>
					</Bar>
				</BarChart>
			</ResponsiveContainer>

		</div>
	);
};

export default Chart;





