import React from 'react';
import './layout.scss'
import {Outlet} from "react-router-dom";
import Header from "./header/Header";
import {useSelector} from "react-redux";
import {palette} from "../utils/theme";

import lion from '../img/bg_lionRight2.png'
import lionBlack from '../img/bg_lionRight4.png'

const Layout = () => {
    const mode = useSelector(state => state.header.mode);

    return (
        <>
            <header>
                <Header/>
            </header>
            <main style={{
                background: mode === "dark" ? palette.primary[500] : palette.white,
                color: mode === "dark" ? palette.white : palette.black,
            }}>
                <div style={{backgroundImage: mode === "dark" ? `url(${lionBlack})` : `url(${lion})`,backgroundRepeat: 'no-repeat',backgroundPosition: 'bottom right',backgroundSize: '34%', backgroundBlendMode: 'hard-light'}}>
                    <div className='pageContainer'>
                        <Outlet />
                    </div>
                </div>
            </main>

            <footer>

            </footer>
        </>
    );
};

export  {Layout};