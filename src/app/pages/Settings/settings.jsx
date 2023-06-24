import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ModalElement } from '../../components/Modal/ModalElement';
import Api from "../../services/Api";
import {Context} from '../../context/AuthContext';
import './settings.css';

export function Settings(){
  const navigate = useNavigate();
  const [ updateAccountModal, setUpdateAccountModal ] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const { userId, setAuthenticated } = useContext(Context);


  const logout = () => {
    navigate('/');
    localStorage.removeItem('token');
    setAuthenticated(false);
  }

  const deleteAccount = async () => {
    try {
        await Api.delete(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        });
        logout();
    } catch(error) {
        console.error(error);
    }        
  }
  return (
      <div className="settings-container">
        <div className='settings-menu'>
          <h2 className='settings-text'>Configuration</h2>
          <Button className="button settings-button" variant="primary" size="sm" onClick={() => logout()}>Logout</Button>
          <Button className="button settings-button" variant="primary" size="sm" onClick={() => setUpdateAccountModal(true)}>Update Profile</Button>
          <Button className="button settings-button" variant="primary" size="sm" onClick={() => setModalShow(true)}>Delete Account</Button>
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
        <ModalElement
            size='m'
            show={modalShow}
            onHide={() => setModalShow(false)}  
            id="modal"      
        >
            <h2 className='delete-account-text'>Are you sure you want to delete your account?</h2>
            <div className='delete-buttons'>
                <Button className='delete-btn' onClick={() => setModalShow(false)}>NO</Button>
                <Button className='delete-btn' onClick={() => deleteAccount()}>YES</Button>
            </div>
        </ModalElement>
        {/* <UpdateUser isOpen={updateAccountModal} onClose={() => setUpdateAccountModal(false)}/> */}
      </div> 
  )
}