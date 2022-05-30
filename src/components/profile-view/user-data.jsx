import React from 'react';
import { Col, Row, Card } from 'react-bootstrap'

export function UserData(props) {
  const userData = props.userData;
  return (
    <Row className="mt-4">
      <Col>
    <h3>Profile view page</h3>
        <Card className="mt-4">
        <Card.Header>
          <Card.Title className="text-dark mb-0">Profile</Card.Title>
</Card.Header>
          <Card.Body className="text-dark">
            <Card.Text>Username: {userData.username}</Card.Text>
            <Card.Text>Email: {userData.email}</Card.Text>
            <Card.Text>Birthday: {userData.birthday}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
