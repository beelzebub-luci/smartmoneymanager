import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';

function AppNavbar({ theme, toggleTheme }) {
  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          💰 Smart Money Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Form.Check 
              type="switch"
              id="theme-switch"
              label={theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              checked={theme === 'dark'}
              onChange={toggleTheme}
              className="ms-3"
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
