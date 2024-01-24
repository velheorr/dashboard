import React from 'react';
import './layout.scss'
import {NavLink, Outlet} from "react-router-dom";
import Header from "./header/Header";
import {useSelector} from "react-redux";
import {palette} from "../utils/theme";

const Layout = () => {
    const mode = useSelector(state => state.header.mode);

    return (
        <>
            <header>
                {/*<NavLink to="/">Main</NavLink>
                <NavLink to="/counter">Counter</NavLink>*/}
                <Header/>
            </header>
            <main style={{
                background: mode === "dark" ? palette.primary[500] : palette.white,
                color: mode === "dark" ? palette.white : palette.black,

            }}>
                <Outlet/>
            </main>

            <footer>

            </footer>
        </>
    );
};

export  {Layout};