import React, { useContext } from 'react';
import { Context } from '../context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { Start } from '../pages/Start/Start';
import { Home } from '../pages/Home/home';
import { Navigate } from 'react-router-dom'
import { Results } from '../pages/Results/results';
import { Settings } from '../pages/Settings/settings';
import { Details } from '../pages/Details/details';

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
            <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path='/results' element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path='/details' element={<ProtectedRoute><Details /></ProtectedRoute>} />
        </Routes>
    );
}