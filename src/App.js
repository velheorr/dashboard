import React from 'react';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import {Counter} from "./features/counter/Counter";
import Page404 from "./pages/404/Page404";
import {Layout} from "./pages/Layout";
import {Login} from "./pages/login/Login";

import {RequireAuth} from "./hoc/RequireAuth";
import {AuthProvider} from "./hoc/AuthProvider";
import Header from "./pages/header/Header";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<Page404/>}/>
                <Route path='/' element={<Layout/>}>
                    {/*<Route  element={*/}
                    {/*    <RequireAuth>*/}
                    {/*        <Header/>*/}
                    {/*    </RequireAuth>*/}
                    {/*}/>*/}
                    <Route index  element={
                        <RequireAuth>
                            <Counter/>
                        </RequireAuth>
                    }/>
                </Route>
            </Routes>
        </AuthProvider>
    );
}


export default App;