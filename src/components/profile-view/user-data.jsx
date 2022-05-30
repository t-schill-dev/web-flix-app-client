import React from 'react';
import { Col, Row, Card } from 'react-bootstrap'

export function UserData(props) {
  const userdata = props.userdata;
  return (
    <Row>
      <Col>
        <Card className='bg-light text-black' border='black' style={{ textAlign: 'left', marginTop: 20 }}>
          <Card.Title style={{ marginTop: 10, textAlign: "center" }}>Profile</Card.Title>
          <Card.Body className='text-dark'>
            <label htmlFor='username' className='userdata-label'>Username:</label>
            <Card.Text>{userdata.username}</Card.Text>
            <label htmlFor='email' className='userdata-label'>Email:</label>
            <Card.Text>{userdata.email}</Card.Text>
            <label htmlFor='birthday' className='userdata-label'>Birthday:</label>
            <Card.Text>{userdata.birthday}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}