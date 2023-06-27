import { ModalElement } from '../Modal/ModalElement';
import React, { useContext, useState, useEffect, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Load from '../../components/Load/Load';
import { ErrorModal } from '../../components/Toast/ErrorModal';
import {Context} from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './CreateUser.css'

export function CreateUser({ isOpen, onClose }) {
    
    const formCreateUserRef = useRef(null);
    const [validated, setValidated] = useState(true);
    const [ firstName, setFirstName ] = useState('');
    const [ firstNameTouched, setFirstNameTouched ] = useState(false);
    const [ lastName, setLastName ] = useState('');
    const [ lastNameTouched, setLastNameTouched ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ emailTouched, setEmailTouched ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState(false);
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ confirmPasswordTouched, setConfirmPasswordTouched ] = useState(false);
    const { handleCreateNewUser, isFetchingCreateUser, createError } = useContext(Context);

    useEffect(() => {
        setValidated(!!firstName && !!lastName && !!email && !!password);
    }, [email, password, confirmPassword, firstName, lastName]);

    const handleSubmit = (event) => {    
        if (!formCreateUserRef.current.checkValidity()) {
            setValidated(true);
            return;
        }
        handleCreateNewUser(firstName, lastName, email, password)
    };

    return (
        <ModalElement
            size='md'
            show={isOpen}
            onHide={() => {
                onClose();
                setValidated(false);
            }}
            id="modal">
                <h2 className='criar-conta-text'>Create your account</h2>
                <Form ref={formCreateUserRef} validated={validated} id="form">

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>First name</Form.Label>
                        <InputGroup hasValidation>
                        <Form.Control required onTouchStart={() => setFirstNameTouched(true)} onChange={(e) => setFirstName(e.target.value)} type="text" isInvalid={firstNameTouched && !firstName}/>
                            <Form.Control.Feedback type="invalid">
                                Your First name is mandatory.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Last name</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setLastNameTouched(true)} onChange={(e) => setLastName(e.target.value)} type="text" isInvalid={lastNameTouched && !lastName}/>
                            <Form.Control.Feedback type="invalid">
                                Last name is mandatory.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setEmailTouched(true)} onChange={(e) => setEmail(e.target.value)} type="email" isInvalid={emailTouched && !email}/>
                            <Form.Control.Feedback type="invalid">
                                Email is mandatory.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setPasswordTouched(true)} onChange={(e) => setPassword(e.target.value)} type="password" isInvalid={passwordTouched && !password}/>
                            <Form.Control.Feedback type="invalid">
                                Password is mandatory.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setConfirmPasswordTouched(true)} onChange={(e) => setConfirmPassword(e.target.value)} type="password" isInvalid={(confirmPasswordTouched && !confirmPassword) || (confirmPassword !== password)}/>
                            <Form.Control.Feedback type="invalid">
                                Confirm Password is mandatory.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Button className='button' onClick={(e) => handleSubmit(e)} variant="primary" type="button">
                        {isFetchingCreateUser? <Load /> : 'Create'}
                    </Button>
                    {createError.isError && <ErrorModal text={createError.message} show={true}/>}
                </Form>
                
        </ModalElement>
    );
}