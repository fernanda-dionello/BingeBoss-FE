
import React, { useContext, useState, useEffect, useRef } from 'react';
import {Context} from '../../context/AuthContext';
import './Start.css';
import Button from 'react-bootstrap/Button';

export function Start() {
  return (
      <div className='main-container'>
          <div className='bottom-menu'>
            <div className='sign-in-container'>
              <Button className="button" variant="primary" size="sm">Sign up</Button>
              <div className='sign-in'>
                <p>Already have an account?</p>
                <Button className="sign-in-link" variant="link" size="sm">Sign in</Button>
              </div>
            </div>
            <h1 className='start-title'>Manage all your <span className='series'>series</span> and <span className='movies'>movies</span> at the same place</h1>
          </div>
      </div>
  );
}