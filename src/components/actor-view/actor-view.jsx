import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


export class ActorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
        <Navbar fixed='top' bg="dark" variant='dark' expand="lg">
          <Container>
            <Navbar.Brand href="#home">web-flix-movies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container>
          <Row className='movie-actors'>
            <Col>
              <h4 className='label'>Name: </h4>

            </Col>
            <Col>
              <span className='value'>{movie.actors.map((actor) => actor + ', ')}</span>

            </Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>

          </Row>
        </Container>
      </>
    )
  }
}