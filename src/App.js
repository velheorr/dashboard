import React from 'react';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import {Counter} from "./features/counter/Counter";
import Page404 from "./pages/404/Page404";
import {Layout} from "./pages/Layout";
import {Login} from "./pages/login/Login";

import {RequireAuth} from "./hoc/RequireAuth";
import {AuthProvider} from "./hoc/AuthProvider";
import Main from "./pages/main/Main";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path='login' element={<Login/>}/>
                <Route path='*' element={<Page404/>}/>
                <Route path='/' element={<Layout/>}>
                    <Route index element={
                        <RequireAuth>
                            <Main/>
                        </RequireAuth>
                    }/>
                    <Route path='counter'  element={
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