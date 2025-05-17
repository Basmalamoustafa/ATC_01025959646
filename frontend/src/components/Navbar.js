import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AppNavbar = ({ isDarkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">Event Booker</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Events</Nav.Link>
            {token && <Nav.Link as={Link} to="/bookings">My Bookings</Nav.Link>}

            {/* Admin Links */}
            {token && role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/admin/events">Manage Events</Nav.Link>
                <Nav.Link as={Link} to="/admin/users">Manage Users</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-center">
            {/* Dark Mode Toggle Button */}
            <Button 
              variant={isDarkMode ? 'light' : 'dark'} 
              onClick={toggleDarkMode} 
              className="me-2"
            >
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>

            {token ? (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline-primary" as={Link} to="/login" className="me-2">
                  Log In
                </Button>
                <Button variant="primary" as={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
