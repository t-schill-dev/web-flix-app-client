import React from "react";
import { ProfileView } from '../profile-view/profile-view'
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';

export function NavbarView({ user }) {
  const onLoggedOut = () => {
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
  };

  return (

    <Navbar id='navbar' fixed='top' bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">web-flix-movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuth() && (
              <Nav.Link href={'/'}>Home</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
            )}
          </Nav>
          {isAuth() && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button id='search-button' variant="outline-success">Search</Button>
            </Form>
          )}
          {isAuth() && (
            <Button variant='link' onClick={() => { this.onLoggedOut() }}>Logout</Button>
          )}
          {!isAuth() && (
            <Nav.Link href="/">Login</Nav.Link>
          )}
          {!isAuth() && (
            <Nav.Link href="/register">Sign-up</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}