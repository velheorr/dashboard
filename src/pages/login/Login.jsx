import React from 'react';
import './login.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hook/useAuth";
import {Box, Button, Container, CssBaseline, Typography} from "@mui/material";
import logo from '../../img/logo.png';
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {palette} from "../../utils/theme";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth()

    const fromPage = location.state?.from?.pathname || '/';

   /* const formSubmit = (event) =>{
        event.preventDefault();
        const form = event.target
        const user = form.username.value;

        signIn(user, ()=> navigate(fromPage, {replace: true}));
    }*/

    const {register,handleSubmit,formState: { errors },} = useForm()

    const onSubmit = (data) => {
        /*console.log(data)*/
        signIn('user', ()=> navigate(fromPage, {replace: true}));
    }

    return (
        <>
            <div className='loginContainer'>
                <Box className='box'>
                    <div>
                        <img className='img' src={logo} alt=""/>
                        <Typography sx={{mt: 2}} align='center' variant="h5" gutterBottom>DASHBOARD</Typography>
                        <Typography sx={{mt: 2}} align='left' variant="h6" gutterBottom>Авторизация:</Typography>
                        <Box
                            onSubmit={handleSubmit(onSubmit)}
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '100'},}}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField fullWidth  id="email" label="E-mail" required variant="outlined" type='email'  size='small'
                                       {...register("email", {required: 'Укажите ваш Email', pattern: {
                                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                               message: "Некорректный адрес электронной почты"
                                           } })}
                                       error={errors.email && true}
                                       helperText={errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                            />
                            <TextField fullWidth  id="password" label="Пароль" required variant="outlined" type='password' size='small'
                                       {...register("password", {required: 'Введите пароль'})}
                                       error={errors.password && true}
                                       helperText={errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
                            />
                            <Button fullWidth variant="outlined" type='submit' size='small' color="success">Войти</Button>
                        </Box>
                        <Box sx={{textAlign: 'right', mt: 2}}>
                            <Typography variant="caption" display="block" gutterBottom color={palette.grey["500"]}>
                                Ещё не зарегистрированы? <Link to='/register'>Регистрация</Link>
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom color={palette.grey["500"]}>
                                Забыли пароль? <Link to='/'>Сброс пароля</Link>
                            </Typography>
                        </Box>
                    </div>
                </Box>
            </div>

        </>
    );
};

export  {Login};


