import Navbar from 'react-bootstrap/Navbar';
import './NavTop.css'
import logo from '../../assets/logo.svg'
import { useContext } from 'react';
import { Context } from '../../context/AuthContext';
import { Search } from '../Search/Search';
import Menu from '../Menu/Menu';
import { useLocation } from 'react-router-dom';

export function NavTop(){
  const { authenticated } = useContext(Context);

  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <Navbar bsPrefix='navbar'>
          <Navbar.Brand>
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Logo MarcaTexto"
            />
          </Navbar.Brand>
          {authenticated && pathname !== '/' ?
            <>
              <Search />
              <Menu />
            </>
          : ''}
      </Navbar>
    </>
  );
}