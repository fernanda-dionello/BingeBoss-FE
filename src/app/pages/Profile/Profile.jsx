import React, { useContext } from 'react';
import {Context} from '../../context/AuthContext';
import './Profile.css';

export function Profile(){
  const { userId, firstName } = useContext(Context);
    return (
        <div className='profile-container'>
          <h1 className='profile-welcome-text'> Welcome back, <span className="profile-welcome-name">{firstName}</span>! </h1>
        </div>
    )
}