import React from 'react';
import './elements.scss'
import {useSelector} from "react-redux";

const BlockShadow = ({children}) => {
    const mode = useSelector(state => state.header.mode);



    return (
        <div className='blockShadow'>
            {children}
        </div>
    );
};

export default BlockShadow;