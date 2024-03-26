import React from 'react';
import './login.scss'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hook/useAuth";
import {Box, Button, Typography} from "@mui/material";
import logo from '../../img/logo.png';
import TextField from "@mui/material/TextField";
import {useForm} from "react-hook-form";
import {palette} from "../../utils/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import {registerSchema} from "./verify";

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth()
    const fromPage = location.state?.from?.pathname || '/';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data) => {
        signIn('user', ()=> navigate(fromPage, {replace: true}));
    }

    return (
        <>
            <div className='loginContainer'>
                <Box className='box'>
                    <div>
                        <img className='img' src={logo} alt=""/>
                        <Typography sx={{mt: 2, fontWeight: 600}} align='center' variant="h5" gutterBottom>DASHBOARD</Typography>
                        <Typography sx={{mt: 2, fontWeight: 600}} align='left' variant="h6" gutterBottom>Регистрация:</Typography>
                        <Box
                            onSubmit={handleSubmit(onSubmit)}
                            component="form"
                            sx={{'& > :not(style)': { m: 1, width: '100'},}}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField fullWidth  id="email" label="E-mail"  variant="outlined" type='email' size='small'
                                       {...register("email")}
                                       error={errors.email && true}
                                       helperText={errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
                            />
                            <TextField fullWidth  id="password" label="Пароль" variant="outlined" type='password' size='small'
                                       {...register("password")}
                                       error={errors.password && true}
                                       helperText={errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
                            />
                            <TextField fullWidth  id="cpassword" label="Повторите пароль" required variant="outlined" type='password' size='small'

                                       {...register("cpassword")}
                                       error={errors.cpassword && true}
                                       helperText={errors.cpassword && <span style={{color: 'red'}}>{errors.cpassword.message}</span>}
                            />
                            <Button fullWidth variant="outlined" type='submit' size='small' color="success">Зарегистрироваться</Button>
                        </Box>
                        <Box sx={{textAlign: 'right', mt: 2}}>
                            <Typography variant="caption" display="block" gutterBottom color={palette.grey["500"]}>
                                Уже зарегистрированы? <Link to='/login'>Войти</Link>
                            </Typography>
                        </Box>
                    </div>
                </Box>
            </div>

        </>
    );
};

export  {Register};


