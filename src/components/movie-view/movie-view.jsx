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

      // <div className='movie-view'>
      //   <div className='movie-poster'>
      //     <img src={movie.imageUrl} alt='Movie poster' />
      //   </div>
      //   <div className='movie-title'>
      //     <span className='label'>Title: </span>
      //     <span className='value'>{movie.title}</span>
      //   </div>
      //   <div className='movie-year'>
      //     <span className='label'>Year: </span>
      //     <span className='value'>{movie.year}</span>
      //   </div>
      //   <div className='movie-runtime'>
      //     <span className='label'>Runtime: </span>
      //     <span className='value'>{movie.runtime}</span>
      //   </div>
      //   <div className='movie-description'>
      //     <span className='label'>Plot: </span>
      //     <span className='value'>{movie.plot}</span>
      //   </div>
      //   <div className='movie-director'>
      //     <span className='label'>Director: </span>
      //     <span className='value'>{movie.director.name}</span>
      //     <span className='value'>{movie.director.bio}</span>
      //     <span className='value'>{movie.director.birth}</span>
      //   </div>
      //   <div className='movie-actors'>
      //     <span className='label'>Actors: </span>
      //     <span className='value'>{movie.actors.map((actor) => actor + ', ')}</span>
      //   </div>
      //   <div className='movie-genres'>
      //     <span className='label'>Genres: </span>
      //     <span className='value'>{movie.genres.map((genre) => genre + ', ')}</span>
      //   </div>

      //
      // </div>
    );
  }
}

MovieView.propTypes = {
  onBackClick: PropTypes.func.isRequired
}