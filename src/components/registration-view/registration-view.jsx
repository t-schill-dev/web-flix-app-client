import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';
import './registration-view.scss';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://web-flix-movies.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        window.open('/', '_self');
        //self opens page in current tab
      })
      .catch(e => {
        console.log('error registering the user');
      })
  };

  return (
    <Container className='view-container' fluid>
      <Row>
        <NavbarView />
      </Row>
      <Row className='justify-content-center registration-view' >

        <Card id='registration-form'>
          <Card.Body>
            <Card.Title>Please Register</Card.Title>
            <Form>
              <Form.Group>
                <Form.Label>Username:*</Form.Label>
                <Form.Control
                  type='text'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder='Enter a username'>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:*</Form.Label>
                <Form.Control
                  type='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder='Enter a Password'>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:*</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder='Enter your email'>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type='date'
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  placeholder='DD.MM.YYY'>
                </Form.Control>
              </Form.Group>
              <Button variant='primary' id='register-btn'
                type='submit' onClick={handleSubmit}>Register
              </Button>
            </Form>
          </Card.Body>
        </Card>

      </Row>
    </Container>
  );
};

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string,
  birthday: PropTypes.number
}