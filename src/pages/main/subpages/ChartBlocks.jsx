import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Tooltip, Typography} from "@mui/material";
import {palette} from "../../../utils/theme";
import Chart from "../../../elements/Chart";
import {setItem} from "../MainSlice";
import BlockShadow from "../../../elements/BlockShadow";

const ChartBlocks = ({item})=>{
    const mode = useSelector(state => state.header.mode);
    const dispatch = useDispatch()
    const handleClick = ()=>{
        dispatch(setItem(item))
    }

    return	<Link to='/detailedView' onClick={handleClick}>
        <div style={{display: 'inline-block', width: '50%'}} >
            <BlockShadow>
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
            </BlockShadow>
        </div>
    </Link>
}
export default ChartBlocks;