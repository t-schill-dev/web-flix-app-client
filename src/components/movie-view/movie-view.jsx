import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid>
        <Row className='movie-view'>
          <Col>
            <Card>
              <Card.Body>
                <Card.Header className='movie-title'>{movie.title}</Card.Header>
                <Card.Text className='movie-year'>{movie.year}</Card.Text>
                <Card.Text className='movie-runtime'>{movie.runtime}</Card.Text>
                <Button onClick={() => onClick(director)} variant='link'>{movie.director.name}</Button>
                <Button onClick={() => onClick(actor)} variant='link'>{movie.actors.map((actor) => actor + ', ')}</Button>
                <Card.Text className='movie-genres'>{movie.genres.map((genre) => genre + ', ')}</Card.Text>
                <Card.Text className='movie-plot'>{movie.plot}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <img src={movie.imageUrl} alt='Movie poster' />
          </Col>
        </Row>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
      </Container>


    );
  }
}

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired
}