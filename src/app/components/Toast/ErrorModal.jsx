import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer'

export function ErrorModal({ text, variant = 'light', isVisible }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    
    return (
        <ToastContainer style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }} className="p-3">
            <Toast bg={variant.toLowerCase()} onClose={() => setShow(false)} show={show} style={{ width: '450px' }}>
                <Toast.Header style={{ background: 'linear-gradient(11deg, #f68e49, #ffb07b)', justifyContent: 'end' }}>
                </Toast.Header>
                <Toast.Body style={{  fontSize: '1.1rem' }}>{text}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}