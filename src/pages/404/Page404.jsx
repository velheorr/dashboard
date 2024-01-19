import React from 'react';
import {useNavigate} from "react-router";

const Page404 = () => {
    const navigate = useNavigate()

    const goBack = () => navigate(-1)
    const goHome = () => navigate('/', {replace: true}) //ddon't use, Link to=

    return (
        <div>
            Error 404
            <p>Page not found</p>
            <button onClick={goBack}>Back</button>
        </div>
    );
};

export default Page404;