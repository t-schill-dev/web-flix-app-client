import React from 'react';
import { Container, Row, Col, Button, Nav, Navbar } from 'react-bootstrap';
import { NavbarView } from '../navbar-view/navbar-view';


export class ActorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
        <Container>
          <Row>
            <NavbarView />
          </Row>

          <Row className='movie-actors'>
            <Button id='return-button' onClick={() => { onBackClick(); }}>Back</Button>
            <Col>
              <h4 className='label'>Name: </h4>

            </Col>
            <Col>
              <span className='selectedActor'>{movie.actors.map((actor) => actor + ', ')}</span>

            </Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>

          </Row>
        </Container>
      </>
    )
  }
}