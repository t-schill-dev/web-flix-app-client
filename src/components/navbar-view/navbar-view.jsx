import React from "react";
import './navbar-view.scss';

import { Navbar, Container, Nav, Button, Form, FormControl } from 'react-bootstrap';

export function NavbarView() {

  return (

    <Navbar id='navbar' fixed='top' bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">web-flix-movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Profile</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button id='search-button' variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}