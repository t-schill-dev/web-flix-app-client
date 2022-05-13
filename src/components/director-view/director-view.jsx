import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


export class DirectorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (

      <Container>
        <Row className='movie-director'>
          <Col>
            <h4 className='label'>Director: </h4>
            <h5 className='label'>Bio: </h5>
            <h5 className='label'>Birth: </h5>
          </Col>
          <Col>
            <span className='value'>{movie.director.name}</span>

            <span className='value'>{movie.director.bio}</span>

            <span className='value'>{movie.director.birth}</span>
          </Col>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>

        </Row>
      </Container>
    )
  }
}