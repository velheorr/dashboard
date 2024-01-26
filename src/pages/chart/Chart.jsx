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
		<>
			<ResponsiveContainer width="100%" height="100%" style={{width: '100px', height: '100px'}}>
				<BarChart width={150} height={40} data={dataW}
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

		</>
	);
};

export default Chart;





