import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

function NavBar() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    console.log('Logging out...');
    sessionStorage.removeItem('user');
    setUser({ name: '', isLoggedIn: false });
};

  const updateUser = () => {
    console.log('Update User');
  };

  const deleteUser = () => {
    console.log('Delete User');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" className="mx-2">Products</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="mx-2">Cart</Nav.Link>
          </Nav>
          <Nav>
            {user.isLoggedIn ? (
              <NavDropdown title={'Welcome'} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/users" className="mx-2" onClick={updateUser}>Update User</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/users"  className="mx-2" onClick={deleteUser}>Delete User</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
                <Nav.Link as={Link} to="/users" className="mx-2">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;