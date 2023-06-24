import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './settings.css';

export function Settings(){
  const [ updateAccountModal, setUpdateAccountModal ] = useState(false);


    return (
        <div className="settings-container">
          <div className='settings-menu'>
            <h2 className='settings-text'>Configuration</h2>
            <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Logout</Button>
            <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Update Profile</Button>
            <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Delete Account</Button>
          </div>
          {/* <UpdateUser isOpen={updateAccountModal} onClose={() => setUpdateAccountModal(false)}/> */}
        </div> 
    )
}