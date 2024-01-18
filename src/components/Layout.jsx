import React from 'react';
import {NavLink, Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <header>
                <NavLink to="/">Main</NavLink>
                <NavLink to="/counter">Counter</NavLink>
            </header>
            <Outlet/>
            <footer>
                2024
            </footer>
        </>
    );
};

export  {Layout};