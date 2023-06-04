import React, { createContext, useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const Context = createContext();

function AuthProvider({children}){
    const [authenticated, setAuthenticated] = useState(!!JSON.parse(localStorage.getItem('token')));
    const [isFetchingLogin, setIsFetchingLogin] = useState(false);
    const [isFetchingCreateUser, setIsFetchingCreateUser] = useState(false);
    const [hasTextInSearchField, setHasTextInSearchField] = useState(false);
    
    const [loginError, setLoginError] = useState({isError: false, message: ''});
    const [createError, setCreateError] = useState({isError: false, message: ''});

    const navigate = useNavigate();
    
    async function handleLogin(email, password){
        setIsFetchingLogin(true);
        setLoginError({ isError: false, message: ''})

        await Api.post('/login', { email, password })
            .then(res => handleRequest(res.data.token))
            .catch(err => setLoginError({ isError: true, message:  err.response.data.msg}))
            .finally(() => setIsFetchingLogin(false));
    }

    async function handleCreateNewUser(firstName, lastName, email, password){
        setIsFetchingCreateUser(true);
        setCreateError({ isError: false, message: ''})
        
        await Api.post('/users', { firstName, lastName, email, password })
            .then(res => handleLogin(email, password))
            .catch(err => setCreateError({ isError: true, message:  err.response.data.msg}))
            .finally(() => setIsFetchingCreateUser(false));
    }

    const handleRequest = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
        Api.defaults.headers.Authorization = `Bearer ${token}`;
        const { uso_id } = jwt_decode(token);
        setAuthenticated(true);
        navigate('/home', {state: uso_id})
    };

    return(
        <Context.Provider value={
          {
            authenticated,
            handleLogin,
            handleCreateNewUser,
            isFetchingLogin,
            isFetchingCreateUser,
            hasTextInSearchField,
            setHasTextInSearchField,
            loginError,
            createError,
            setCreateError
          }
        }>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };