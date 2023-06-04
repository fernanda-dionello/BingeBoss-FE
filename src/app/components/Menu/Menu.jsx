import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import home from '../../assets/home.svg';
import profile from '../../assets/profile.svg';
import settings from '../../assets/settings.svg';
import './Menu.css';
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/AuthContext';

const Menu = () => {
    const navigate = useNavigate();
    const { hasTextInSearchField, setHasTextInSearchField } = useContext(Context);

    const redirect = (path) => {
        if(hasTextInSearchField){
            setHasTextInSearchField(false);
        } 
        navigate(path);
    };

    return (
        <>
            <div className='menu'>
                <ButtonGroup size='lg'>
                    <Button variant="secondary" onClick={() => redirect("/home")}>
                        <img src={home} alt='home' />
                    </Button>
                    <Button variant="secondary" onClick={() => redirect("/profile")}>
                        <img src={profile} alt='profile' />
                    </Button>
                    <Button variant="secondary" onClick={() => redirect("/settings", {state: {oi: 'tchau'}})}>
                        <img src={settings} alt='settings' />
                    </Button>
                </ButtonGroup>
            </div>
        </>
    );
}

export default Menu