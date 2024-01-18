import React from 'react';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import {Counter} from "./features/counter/Counter";
import Main from "./pages/Main";
import Page404 from "./pages/404/Page404";
import {Layout} from "./components/Layout";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Main/>}/>
                    <Route path='counter' element={<Counter/>}/>
                    <Route path='*' element={<Page404/>}/>
                </Route>
            </Routes>
        </>
    );
}


export default App;