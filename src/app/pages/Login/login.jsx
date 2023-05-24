
import React, { useContext, useState, useEffect, useRef } from 'react';
import {Context} from '../../context/AuthContext';
import './login.css';
import Logo from '../../assets/logo.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Load from '../../components/Load/Load';
import InputGroup from 'react-bootstrap/InputGroup';
import { ErrorModal } from '../../components/Toast/ErrorModal';
import { CreateUser } from '../../components/CreateUser/CreateUser';

export function Login() {
    const formRef = useRef(null);
    const { handleLogin, isFetchingLogin, loginError, setCreateError } = useContext(Context);
    const [ email, setEmail ] = useState('');
    const [ emailTouched, setEmailTouched ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ passwordTouched, setPasswordTouched ] = useState(false);
    const [ modalShow, setModalShow ] = useState(false);
    const [validated, setValidated] = useState(true);

    useEffect(() => {
        setValidated(!!email && !!password);
    }, [email, password]);

    const handleSubmit = (event) => {
        if (!formRef.current.checkValidity()) {
          setValidated(true);
          return;
        }
        handleLogin(email, password)
      };
    
    const handleClose = (event) => {
        setCreateError({ isError: false, message: ''});
        setModalShow(false);
    }

    return (
        <div className='main-container'>
            <div className='pai'>
                <img src={Logo} width="172px" height="179px" alt="Logo-MarcaTexto"></img>
                <Form ref={formRef} validated={validated} className='forms forms-new-user'>
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
                        {isFetchingLogin? <Load /> : 'ACESSAR'}
                    </Button>
                    {loginError.isError && <ErrorModal text={loginError.message} show={true} />}

                    <button className='link' onClick={() => setModalShow(true)} type="button">Criar minha conta</button>
                    <CreateUser isOpen={modalShow} onClose={(e) => handleClose(e)}></CreateUser>
                </Form>
            </div>
        </div>
    );
}