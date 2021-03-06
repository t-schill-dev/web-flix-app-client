import React from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';

export function UpdateUser(props) {
  const user = props.userdata;
  const { handleSubmit } = props;

  return (
    <>
      <Col>
        <Row>
          <Card className="bg-light" border='danger' style={{ textAlign: 'left' }}>
            <Form className="profile-form text-dark" onSubmit={(e) => handleSubmit(e)} border='danger'>

              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  name='username'
                  defaultValue={user.username}
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='text'
                  name='password'
                  placeholder="New Password (required when updating profile info)"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='text'
                  name='email'
                  defaultValue={user.email}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
              <h5>After update, please log out, then log back in</h5>
            </Form>
          </Card>
        </Row>
      </Col>
    </>
  )
}


