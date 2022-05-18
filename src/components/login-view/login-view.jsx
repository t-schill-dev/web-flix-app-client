import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import { RegistrationView } from "../registration-view/registration-view";
import { NavbarView } from '../navbar-view/navbar-view';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    axios.post('https://web-flix-movies.herokuapp.com/login', {
      username: username,
      password: password
    }).then(response => {
      const data = response.data;
      /* Data including the token will be passed to parent component */
      props.onLoggedIn(data)
    })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (

    <Container className='view-container' fluid>
      <Row>
        <NavbarView />
      </Row>
      <Row className='justify-content-center login-view'>
        <Card id='login-form'>
          <Card.Body>
            <Card.Title> Login</Card.Title>
            <Form >
              <Form.Group controlId='formUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
              </Form.Group>
            </Form>
            <Button id='submit-btn' variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
            <Button id='register-btn_secondary' variant='outline-secondary' type='button'>Register here</Button>
          </Card.Body>
        </Card>

      </Row>
    </Container>

  );
};

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}