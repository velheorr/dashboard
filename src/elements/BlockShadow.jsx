import React from 'react';
import './elements.scss'
import {useSelector} from "react-redux";

const BlockShadow = ({children}) => {
    const mode = useSelector(state => state.header.mode);
    const theme = `blockShadow ${mode === 'dark'? 'dark': ''}`

    return (
        <div className={theme}>
            {children}
        </div>
    );
};

export default BlockShadow;