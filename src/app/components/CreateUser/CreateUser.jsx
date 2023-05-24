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
    const [ name, setName ] = useState('');
    const [ nameTouched, setNameTouched ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ emailTouched, setEmailTouched ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState(false);
    const { handleCreateNewUser, isFetchingCreateUser, createError } = useContext(Context);

    useEffect(() => {
        setValidated(!!name && !!email && !!password);
    }, [email, password, name]);

    const handleSubmit = (event) => {    
        if (!formCreateUserRef.current.checkValidity()) {
            setValidated(true);
            return;
        }
        handleCreateNewUser(name, email, password)
    };

    return (
        <ModalElement
            size='lg'
            show={isOpen}
            onHide={() => {
                onClose();
                setValidated(false);
            }}
            id="modal">
                <h2 className='criar-conta-text'>Criar Conta</h2>
                <Form ref={formCreateUserRef} validated={validated} id="form">

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nome</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setNameTouched(true)} onChange={(e) => setName(e.target.value)} type="text" isInvalid={nameTouched && !name}/>
                            <Form.Control.Feedback type="invalid">
                                É necessário preencher seu nome.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setEmailTouched(true)} onChange={(e) => setEmail(e.target.value)} type="email" isInvalid={emailTouched && !email}/>
                            <Form.Control.Feedback type="invalid">
                                É necessário preencher seu email.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control required onTouchStart={() => setPasswordTouched(true)} onChange={(e) => setPassword(e.target.value)} type="password" isInvalid={passwordTouched && !password}/>
                            <Form.Control.Feedback type="invalid">
                                É necessário preencher sua senha.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Button className='button' onClick={(e) => handleSubmit(e)} variant="primary" type="button">
                        {isFetchingCreateUser? <Load /> : 'CRIAR'}
                    </Button>
                    {createError.isError && <ErrorModal text={createError.message} show={true}/>}
                </Form>
                
        </ModalElement>
    );
}