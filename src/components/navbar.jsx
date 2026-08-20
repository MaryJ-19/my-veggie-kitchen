import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar-modern" sticky="top">
      <Container>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto align-items-center gap-2 justify-content-center">
            <Nav.Link as={Link} to="/" className="text-white">All</Nav.Link>
            <Nav.Link as={Link} to="/?category=breakfast" className="text-white">Breakfast</Nav.Link>
            <Nav.Link as={Link} to="/?category=main%20course" className="text-white">Mains</Nav.Link>
            <Nav.Link as={Link} to="/?category=side%20dish" className="text-white">Sides</Nav.Link>
            <Nav.Link as={Link} to="/?category=dessert" className="text-white">Sweets</Nav.Link>
            <Nav.Link as={Link} to="/?category=drink" className="text-white">Drinks</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
