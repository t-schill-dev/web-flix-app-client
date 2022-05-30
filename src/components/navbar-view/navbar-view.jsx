import React from "react";
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

export function NavbarView({ user }) {

    const history = useHistory();
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
    {
        isAuth() && (
            <>
        <Link to={'/'} style={{marginRight: 10, textDecoration: 'none', color: '#fff', fontSize: '1rem'}}>
            <span>Home</span>
        </Link>
        <Link to={`/users/${user}`} style={{marginRight: 10, textDecoration: 'none', color: '#fff', fontSize: '1rem'}}>
            <span>profile</span>
        </Link>
            </>
        )
    }
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
