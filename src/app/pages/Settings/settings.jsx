import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './settings.css';

export function Settings(){
  const [ updateAccountModal, setUpdateAccountModal ] = useState(false);
  const [checked, setChecked] = useState(false);

    return (
        <div className="settings-container">
          <div className='settings-menu'>
            <h2 className='settings-text'>Configuration</h2>
            <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Logout</Button>
            <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Update Profile</Button>
            <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Delete Account</Button>
            <div className="settings-spoiler-container">
              <h4 className='settings-spoiler-text'>Spoiler Protection</h4>
              <Form.Switch 
                type="switch"
                id="custom-switch"
                className='spoiler-switch'
                checked={checked}
                onChange={(e) => {
                  setChecked((checked) ? false : true);
                }}
              />
            </div>
          </div>
          {/* <UpdateUser isOpen={updateAccountModal} onClose={() => setUpdateAccountModal(false)}/> */}
        </div> 
    )
}