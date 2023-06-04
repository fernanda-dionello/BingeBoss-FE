
import React, { useState } from 'react';
import './Start.css';
import Button from 'react-bootstrap/Button';
import { CreateUser } from '../../components/CreateUser/CreateUser';
import { Login } from '../../components/Login/Login';

export function Start() {
  const [ loginModal, setLoginModal ] = useState(false);
  const [ createAccountModal, setCreateAccountModal ] = useState(false);

  return (
      <div className='main-container'>
          <div className='bottom-menu'>
            <div className='sign-in-container'>
              <Button className="button" variant="primary" size="sm" onClick={() => setCreateAccountModal(true)}>Sign up</Button>
              <div className='sign-in'>
                <p>Already have an account?</p>
                <Button className="sign-in-link" variant="link" size="sm" onClick={() => setLoginModal(true)}>Sign in</Button>
              </div>
            </div>
            <h1 className='start-title'>Manage all your <span className='series'>series</span> and <span className='movies'>movies</span> at the same place</h1>
          </div>
          <CreateUser isOpen={createAccountModal} onClose={() => setCreateAccountModal(false)}/>
          <Login isOpen={loginModal} onClose={() => setLoginModal(false)}/>
      </div>
  );
}