import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


export class ActorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (

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
    )
  }
}