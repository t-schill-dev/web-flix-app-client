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

  // Use hook for error messages 
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');


  const validateEmail = (email) => {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(emailRegEx)
  }

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 characters long')
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long')
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (validateEmail(email) === -1) {
      setEmailErr('Email is invalid')
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isReq = validate();
    console.log('isReq:', isReq)
    if (isReq) {
      axios.post('https://tough-rose-khakis.cyclic.app/users', {
        username: username,
        password: password,
        email: email,
        birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please log in');
          window.open('/', '_self');
          //self opens page in current tab
        })
        .catch(e => {
          console.log('error registering the user');
        })
    }
  };

  return (
    <Container className='view-container' fluid>
      <Row>
        <NavbarView />
      </Row>
      <Row className='justify-content-center registration-view' >

        <Card id='registration-form'>
          <Card.Body>
            <Card.Title>Sign Up</Card.Title>
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
                {usernameErr && <p>{usernameErr}</p>}
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
                {passwordErr && <p>{passwordErr}</p>}
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
                {emailErr && <p>{emailErr}</p>}
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
              <Button variant='primary' id='register-btn_primary'
                type='submit' onClick={handleSubmit}>Submit
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
  email: PropTypes.string.isRequired,
  birthday: PropTypes.number
}