import React from 'react';
import './elements.scss'
import {useSelector} from "react-redux";
import {palette} from "../utils/theme";

const BlockShadow = ({children}) => {
    const mode = useSelector(state => state.header.mode);
    const theme = `blockShadow ${mode === 'dark'? palette.color.grey_ : ''}`

    return (
        <div className={theme}>
            {children}
        </div>
    );
};

export default BlockShadow;