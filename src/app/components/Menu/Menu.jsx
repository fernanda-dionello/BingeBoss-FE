import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import perfil from '../../assets/perfil.svg';
import './Menu.css';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import _ from 'lodash'

const Menu = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className='menu'>
                <ButtonGroup size='lg'>
                    <Button variant="secondary" onClick={() => navigate("/profile")}>
                        <img src={perfil} alt='perfil' />
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Menu