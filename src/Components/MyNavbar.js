import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const MyNavbar = () => {

  const navigate = useNavigate();


  const handleLogout = () => {
    // Perform any logout logic here (e.g., clear session, local storage)
    console.log('Logging out...');
    // Redirect to login page
    navigate('/');
  };
 
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* You can add additional left-aligned items here if needed */}
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/Services">Other Services</Nav.Link>
          <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link> 
          <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
