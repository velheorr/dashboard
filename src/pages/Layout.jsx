import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Header from "./header/Header";

const Layout = () => {
    return (
        <>
            <header>
                {/*<NavLink to="/">Main</NavLink>
                <NavLink to="/counter">Counter</NavLink>*/}
                <Header/>
            </header>
            <main>
                <Outlet/>
            </main>

            <footer>
                2024
            </footer>
        </>
    );
};

export  {Layout};