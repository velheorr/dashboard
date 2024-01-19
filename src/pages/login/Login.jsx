import React from 'react';
import './login.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hook/useAuth";
import {Box, Container, CssBaseline} from "@mui/material";
import logo from '../../img/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth()

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target
        const user = form.username.value;

        signIn(user, ()=> navigate(fromPage, {replace: true}));
    }

    return (
        <>
            <div className='loginContainer'>
                <Box className='box'>

                    <div>
                        <img className='img' src={logo} alt=""/>
                        <p className='title'>DASHBOARD</p>
                        <div>Пожалуйста авторизируйтесь</div>
                        <h1>Авторизация</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name: <input type="text" name='username'/>
                            </label>
                            <button type='submit'>Login</button>
                        </form>
                        <div>
                            <p>Ещё не зарегистрированы?Регистрация</p>
                            <p>Забыли пароль?Сброс пароля</p>
                        </div>
                    </div>
                </Box>
            </div>

        </>
    );
};

export  {Login};