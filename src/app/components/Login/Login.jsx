import { ModalElement } from '../Modal/ModalElement';
import React, { useContext, useState, useEffect, useRef } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Load from '../../components/Load/Load';
import { ErrorModal } from '../../components/Toast/ErrorModal';
import {Context} from '../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'

export function Login({ isOpen, onClose }) {
    
    const formLoginRef = useRef(null);
    const [validated, setValidated] = useState(true);
    const [ email, setEmail ] = useState('');
    const [ emailTouched, setEmailTouched ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState(false);
    const { handleLogin, isFetchingLogin, loginError } = useContext(Context);

    useEffect(() => {
        setValidated(!!email && !!password);
    }, [email, password]);

    const handleSubmit = (event) => {    
        if (!formLoginRef.current.checkValidity()) {
            setValidated(true);
            return;
        }
        handleLogin(email, password)
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
                <h2 className='login-text'>Login</h2>
                <Form ref={formLoginRef} validated={validated} id="form">

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

                    <Button className='button' onClick={(e) => handleSubmit(e)} variant="primary" type="button">
                        {isFetchingLogin? <Load /> : 'Login'}
                    </Button>
                    {loginError.isError && <ErrorModal text={loginError.message} show={true}/>}
                </Form>
                
        </ModalElement>
    );
}