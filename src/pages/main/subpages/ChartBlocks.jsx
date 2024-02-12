import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Tooltip, Typography} from "@mui/material";
import {palette} from "../../../utils/theme";
import Chart from "../../../elements/Chart";
import {setItem} from "../MainSlice";

const ChartBlocks = ({item})=>{
    const mode = useSelector(state => state.header.mode);
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(setItem(item))
    }

    return	<Link to='/detailedView' item={item} onClick={handleClick}>
        <div style={{display: 'inline-block', width: '50%'}} >
            <div style={{boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)', margin: '5px', }}>
                <Tooltip title={item.НаименованиеОбъекта} size="large">
                    <Typography sx={{mt: 2, pl: 1, pr: 1, color: mode === "dark" ? palette.white : palette.black}}
                                noWrap
                                align='center'
                                variant="h6"
                                gutterBottom>
                        {item.НаименованиеОбъекта}
                    </Typography>
                </Tooltip>
                <Chart item={item}/>
            </div>
        </div>
    </Link>
}
export default ChartBlocks;