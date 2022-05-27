import React from 'react';
import { Col, Row, Card } from 'react-bootstrap'

export function UserData(props) {
  const userdata = props.userdata;
  return (
    <Row>
      <Col>
        <Card className='bg-light text-black' border='black' style={{ textAlign: 'left', marginTop: 20 }}>
          <Card.Title style={{ marginTop: 10, textAlign: "center" }}>Profile</Card.Title>
          <Card.Body>
            <Card.Text>Username: {userdata.username}</Card.Text>
            <Card.Text>Email: {userdata.email}</Card.Text>
            <Card.Text>Birthday: {userdata.birthday}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}