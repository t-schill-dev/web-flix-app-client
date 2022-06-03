import React from "react";
import './navbar-view.scss';
import { Link } from 'react-router-dom'
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

export function NavbarView({ user }) {
  function onLoggedOut() {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else {
      return false;
    }
  }

  return (

    <Navbar id='navbar' fixed='top' bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">web-flix-movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth() && (
              <Link to='/' className="nav-link">Home</Link>
            )}
            {isAuth() && (
              <Link to={`/users/${user}`} className="nav-link">Profile</Link>
            )}
          </Nav>
          {isAuth() && (
            <Form className="d-flex">
              <VisibilityFilterInput />
            </Form>
          )}
          {isAuth() && (
            <Button variant='link' onClick={() => { onLoggedOut() }} className="nav-link">Logout</Button>
          )}
          {!isAuth() && (
            <Link to='/' className="nav-link">Login</Link>
          )}
          {!isAuth() && (
            <Link to='/register' className="nav-link">Sign-up</Link>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};