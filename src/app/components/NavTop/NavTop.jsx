import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './NavTop.css'
import logo from '../../assets/logo.svg'

export function NavTop(){
  return (
    <>
      <Navbar bsPrefix='navbar'>
        <Container>
          <Navbar.Brand>
            <img
              src={logo}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="Logo MarcaTexto"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}