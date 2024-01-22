import React from 'react';
import './login.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hook/useAuth";
import {Box, Container, CssBaseline} from "@mui/material";
import logo from '../../img/logo.png';
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth()

    const fromPage = location.state?.from?.pathname || '/';

    const formSubmit = (event) =>{
        event.preventDefault();
        const form = event.target
        const user = form.username.value;

        signIn(user, ()=> navigate(fromPage, {replace: true}));
    }

    const {register,handleSubmit,formState: { errors },} = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <>
            <div className='loginContainer'>
                <Box className='box'>

                    <div>
                        <img className='img' src={logo} alt=""/>
                        <p className='title'>DASHBOARD</p>
                        <div>Пожалуйста авторизируйтесь</div>
                        <h1>Авторизация</h1>
                        <Box
                            onSubmit={handleSubmit(onSubmit)}
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '100'},}}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField fullWidth  id="email" label="E-mail" required variant="outlined"  size='small'
                                       {...register("email", {required: 'Укажите ваш Email', pattern: {
                                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                               message: "Некорректный адрес электронной почты"
                                           } })}
                                       error={errors.email && true}
                                       helperText={errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                            />
                            <TextField fullWidth  id="password" label="Пароль" required variant="outlined" type='password' size='small'
                                       {...register("password", {required: 'Введите пароль'})}

                            />
                            <button type='submit'>Login</button>
                        </Box>
                        <form onSubmit={formSubmit}>
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


