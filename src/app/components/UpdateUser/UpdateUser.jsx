import { ModalElement } from '../Modal/ModalElement';
import React, { useContext, useState, useEffect, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Load from '../Load/Load';
import { ErrorModal } from '../Toast/ErrorModal';
import {Context} from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './UpdateUser.css'

export function UpdateUser({ isOpen, onClose }) {
    const { 
        handleUpdateUser, 
        isFetchingUpdateUser, 
        updateError, 
        firstName: currentFirstName, 
        lastName: currentLastName,
        email: currentEmail 
    } = useContext(Context);
    const formEditUserRef = useRef(null);
    const [validated, setValidated] = useState(true);
    const [ firstName, setFirstName ] = useState(currentFirstName);
    const [ firstNameTouched, setFirstNameTouched ] = useState(false);
    const [ lastName, setLastName ] = useState(currentLastName);
    const [ lastNameTouched, setLastNameTouched ] = useState(false);
    const [ email, setEmail ] = useState(currentEmail);
    const [ emailTouched, setEmailTouched ] = useState(false);
    const [ newPassword, setNewPassword ] = useState('');
    const [ newPasswordTouched, setNewPasswordTouched ] = useState(false);
    const [ oldPassword, setOldPassword ] = useState('');
    const [ oldPasswordTouched, setOldPasswordTouched ] = useState(false);
    const [ confirmedPassword, setConfirmedPassword ] = useState('');
    const [ confirmedPasswordTouched, setConfirmedPasswordTouched ] = useState(false);

    useEffect(() => {
        setValidated(!!firstName && !!lastName && !!email && !!oldPassword && !!newPassword && !!confirmedPassword);
    }, [email, oldPassword, firstName, lastName, newPassword, confirmedPassword]);

    const handleSubmit = (event) => {    
        if (!formEditUserRef.current.checkValidity()) {
            setValidated(true);
            return;
        }
        handleUpdateUser({firstName , lastName, email, oldPassword, newPassword, confirmedPassword});
        onClose();
    };

    return (
        <ModalElement
            size='md'
            show={isOpen}
            onHide={() => onClose()}
            id="modal"
        >
            <h2 className='update-account-text'>Update your account</h2>
            <Form ref={formEditUserRef} validated={validated} id="form">
                <Form.Group className="mb-1" controlId="formBasicName">
                    <Form.Label>First Name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control defaultValue={currentFirstName} onTouchStart={() => setFirstNameTouched(true)} onChange={(e) => setFirstName(e.target.value)} type="text" isInvalid={firstNameTouched && !firstName}/>
                        <Form.Control.Feedback type="invalid">
                            Your first name is required.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicName">
                    <Form.Label>Last Name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control defaultValue={currentLastName} onTouchStart={() => setLastNameTouched(true)} onChange={(e) => setLastName(e.target.value)} type="text" isInvalid={lastNameTouched && !lastName}/>
                        <Form.Control.Feedback type="invalid">
                            Your last name is required.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control defaultValue={currentEmail} onTouchStart={() => setEmailTouched(true)} onChange={(e) => setEmail(e.target.value)} type="email" isInvalid={emailTouched && !email}/>
                        <Form.Control.Feedback type="invalid">
                            Email is required.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <p className='form-p-instruction'>*Only fill in the fields below if you want to change your password</p>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Old Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control onTouchStart={() => setOldPasswordTouched(true)} onChange={(e) => setOldPassword(e.target.value)} type="password" isInvalid={oldPasswordTouched && !oldPassword}/>
                        <Form.Control.Feedback type="invalid">
                            Old password is invalid.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control onTouchStart={() => setNewPasswordTouched(true)} onChange={(e) => setNewPassword(e.target.value)} type="password" isInvalid={newPasswordTouched && !newPassword}/>
                        <Form.Control.Feedback type="invalid">
                            New password is invalid.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Confirmed Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control onTouchStart={() => setConfirmedPasswordTouched(true)} onChange={(e) => setConfirmedPassword(e.target.value)} type="password" isInvalid={confirmedPasswordTouched && !confirmedPassword}/>
                        <Form.Control.Feedback type="invalid">
                            Confirmed password is invalid.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button className='button' onClick={(e) => handleSubmit(e)} variant="primary" type="button">
                    {isFetchingUpdateUser? <Load /> : 'Update'}
                </Button>
                {updateError.isError && <ErrorModal text={updateError.message} show={true}/>}
            </Form>
        </ModalElement>
    );
}