import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    return (
        <div>
            <h1>Login</h1>
            {fromPage}
        </div>
    );
};

export  {Login};