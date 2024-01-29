import React, {useEffect} from 'react';
import {settings} from "./slider/sliderSettings";
import Slider from "react-slick";
import {useSelector} from "react-redux";
import {Bar, BarChart, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const MainSlider = () => {
    const dataFromDB = useSelector(state => state.mainData.dataFromDB);
    const selectHolding = useSelector(state => state.mainData.selectHolding);
    const selectKontragent = useSelector(state => state.mainData.selectKontragent);
    const filteredKontragentByHolding = useSelector(state => state.mainData.filteredKontragentByHolding);

    const mapChart = ()=> {
        const charts = dataFromDB?.map((item, i) =>
            (  <div key={i}>
                <div>{item.НаименованиеОбъекта}</div>
                {/*<div style={{ position: "relative", height: "100%" }}>
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
                </div>*/}
            </div>
        )
        )

        return charts
    }

    useEffect(()=>{
        if (dataFromDB?.length > 0){
            mapChart()
        }

    },[dataFromDB])


    return (
        <div>
            <Slider {...settings}>
                {mapChart}
                <div><h3>aaa</h3></div>
                <div><h3>3</h3></div>
                <div><h3>bbb</h3></div>
                <div><h3>3</h3></div>
                <div><h3>2</h3></div>



            </Slider>
        </div>
    );
};

export default MainSlider;