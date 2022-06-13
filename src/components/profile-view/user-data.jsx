import React from 'react';
import { Col, Row, Card } from 'react-bootstrap'

export function UserData(props) {
  const userdata = props.userdata;
  let birthDate = new Date(userdata.birthday);
  let user_iso_date = birthDate.toLocaleDateString();

  return (
    <>
      <Col>
        <Row>
          <Card className='bg-light' border='black' >
            <Card.Title className='text-dark' >Your info</Card.Title>
            <Card.Body className='text-dark' style={{ textAlign: 'left' }}>
              <label htmlFor='username' className='userdata-label'>Username:</label>
              <Card.Text>{userdata.username}</Card.Text>
              <label htmlFor='email' className='userdata-label'>Email:</label>
              <Card.Text>{userdata.email}</Card.Text>
              <label htmlFor='birthday' className='userdata-label'>Birthday:</label>
              <Card.Text>{user_iso_date}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Col>
    </>
  )
}