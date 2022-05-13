import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Row, Col, Container } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  // const handleClick = (e) => {
  //   return <RegistrationView />
  // }

  return (

    <Container>
      <Row>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title> Login</Card.Title>
              <Form>
                <Form.Group controlId='formUsername'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type='text' onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPassword'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type='password' onChange={e => setPassword(e.target.value)} />
                </Form.Group>
              </Form>
              <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
              {/*<Button variant='outline-secondary' type='button' onClick={handleClick}>Register here</Button>*/}
            </Card.Body>
          </Card>
        </CardGroup>
      </Row>
    </Container>

  );
};

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}