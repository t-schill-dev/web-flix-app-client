import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { NavbarView } from '../navbar-view/navbar-view';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //Declare hook for Errors
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  //validate user input
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (username.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://web-flix-movies.herokuapp.com/login', {
        username: username,
        password: password
      }).then(response => {
        const data = response.data;
        /* Data including the token will be passed to parent component */
        props.onLoggedIn(data)
      })
        .catch(e => {
          alert('This user does not exist');
          console.log('no such user')
        });
    }
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
                <Form.Control type='text' placeholder='Enter username' value={username}
                  onChange={e => setUsername(e.target.value)} />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>
              <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                  onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>
            </Form>
            <Button id='submit-btn' variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
            <Link to='/register'>
              <Button id='register-btn_secondary' variant='outline-secondary' type='button'>Register here</Button>
            </Link>

          </Card.Body>
        </Card>

      </Row >
    </Container >

  );
};

LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
}