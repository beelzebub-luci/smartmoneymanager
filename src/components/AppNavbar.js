import React from 'react';
import { Navbar, Container, Nav, Form, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function AppNavbar({ theme, toggleTheme }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" className="mb-4 shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          💰 {t('appTitle')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Dropdown className="me-3">
              <Dropdown.Toggle variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} size="sm">
                🌐 {i18n.language === 'hi' ? t('language.hindi') : t('language.english')}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage('en')}>
                  {t('language.english')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage('hi')}>
                  {t('language.hindi')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Check 
              type="switch"
              id="theme-switch"
              label={theme === 'dark' ? `🌙 ${t('navbar.dark')}` : `☀️ ${t('navbar.light')}`}
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
