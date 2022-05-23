import React from 'react';
import { Col, Row, Card } from 'react-bootstrap'

export function UserData(props) {
  const userData = props.userdata;
  return (
    <Row>
      <Col>
        <Card>
          <Card.Title>Profile</Card.Title>
          <Card.Body>
            <Card.Text>Username: {userData.username}</Card.Text>
            <Card.Text>Email: {userData.email}</Card.Text>
            <Card.Text>Birthday: {userData.birthday}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}