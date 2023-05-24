import React, { useContext } from 'react';
import { Context } from '../context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { Start } from '../pages/Start/Start';
import { Home } from '../pages/Home/home';
import { Navigate } from 'react-router-dom'
import Menu from '../components/Menu/Menu';

const ProtectedRoute = ({ children }) => {
    const { authenticated } = useContext(Context);

    if (!authenticated) {
        return <Navigate to="/" replace />;
    }
  
    return <>
        {children}
    </>;
}

export default function RouterWrapper() {
    return (
        <Routes className='content'>
            <Route path='' element={<Start />} />
            <Route path='/home' element={<ProtectedRoute><Home /><Menu /></ProtectedRoute>} />
        </Routes>
    );
}